// TODO DB lock when scraping is running
import fetch from 'isomorphic-unfetch'
import cheerio from 'cheerio'
import { db } from 'src/lib/db'

// data returns in format: { "2020-02-28": 324, "2020-02-29": 500 }
const extractDataFromChart = function($, chartId) {
  /** @type string */
  const htmlAttempt = $(`div#${chartId}`).parent().parent().parent().parent().find('script').html();

  const hackedChartJSON = htmlAttempt.split('Highcharts.chart(').find(
      (chart) => chart.includes(chartId)
    )
    .replace(/^.*?\{/, '{')
    .replace(/\}\);[\s\n]*?$/gi, '}')
    .replace(/([A-z]+):/g, '"$1":')
    .replace(/'/g, '"')

  const json = JSON.parse(hackedChartJSON)

  console.log("parsed chart json!")

  const xVals = json.xAxis.categories
  const yVals = json.series[0].data

  let data = {}

  xVals.forEach((val, i) => {
    // need to manually set year to 2020
    let day = new Date(val + ", 2020")

    // converts date from "Feb 24" to YYYY-MM-DD
    const fmtedDay = day.toISOString().split('T')[0]

    data[fmtedDay] = yVals[i] || 0
  })

  return data
}

// ex. data = { "2020-02-28": { confirmedCases: 43 } }, new cases = { "2020-02-28": 23 }, keyForData = "newCases"
// returns { "2020-02-28": { confirmedCases: 43, newCases: 23 } }
const mergeChart = function(data, toMergeIn, keyForData) {
  for (const day in toMergeIn) {
    data[day] = data[day] || {}
    data[day][keyForData] = toMergeIn[day]
  }

  return data
}

// total cases, new cases, currently infected, total deaths, new deaths
const scrapeCases = async function(country) {
  const url = `https://worldometers.info/coronavirus/country/${country}/`
  const html = await fetch(url).then((r) => r.text())

  console.log('fetched', url)

  const $ = cheerio.load(html)

  // these chart ids were manually found on the worldometers website
  const totalCases = extractDataFromChart($, 'coronavirus-cases-linear')
  const newCases = extractDataFromChart($, 'graph-cases-daily')
  const currentlyInfected = extractDataFromChart($, 'graph-active-cases-total')
  const totalDeaths = extractDataFromChart($, 'coronavirus-deaths-linear')
  const newDeaths = extractDataFromChart($, 'graph-deaths-daily')

  let data = {}
  data = mergeChart(data, totalCases, 'totalCases')
  data = mergeChart(data, newCases, 'newCases')
  data = mergeChart(data, currentlyInfected, 'currentlyInfected')
  data = mergeChart(data, totalDeaths, 'totalDeaths')
  data = mergeChart(data, newDeaths, 'newDeaths')

  return data
}

const dbBS = async function() {
  const countries = await db.country.findMany()

  console.log(countries)

  for (const country of countries) {
    console.log('\n###############')
    console.log(
      `Syncing ${country.name} (${country.iso}, ${country.worldometersSlug})`
    )
    console.log('###############')

    console.log('\nBeginning scraping...')
    const data = await scrapeCases(country.worldometersSlug)
    console.log('Done!')

    console.log('\nBeginning sync with DB...')
    for (const day in data) {
      console.log(
        `Fetching Day for ${day} (and creating one if it doesn't exist)`
      )
      const dbDay = await db.day.upsert({
        update: { date: new Date(day) },
        where: { date: new Date(day) },
        create: { date: new Date(day) }
      })

      console.log(`
Beginning DailyCount creation for ${day} (or update if it already exists)...`)
      const foundCounts = await db.dailyCount.findMany({
        where: {
          country: { id: country.id },
          date: { id: dbDay.id }
        }
      })

      if (foundCounts.length == 0) {
        console.log('No DailyCount found. Creating one.')
        const {
          totalCases,
          newCases,
          currentlyInfected,
          totalDeaths,
          newDeaths
        } = data[day]
        await db.dailyCount.create({
          data: {
            country: { connect: { id: country.id } },
            date: { connect: { id: dbDay.id } },
            totalCases,
            newCases,
            currentlyInfected,
            totalDeaths,
            newDeaths
          }
        })
      } else if (foundCounts.length == 1) {
        console.log(`DailyCount #${foundCounts[0].id} found. Updating it...`)
        const {
          totalCases,
          newCases,
          currentlyInfected,
          totalDeaths,
          newDeaths
        } = data[day]
        await db.dailyCount.update({
          where: { id: foundCounts[0].id },
          data: {
            totalCases,
            newCases,
            currentlyInfected,
            totalDeaths,
            newDeaths
          }
        })
      } else {
        console.error(
          'Multiple DailyCounts found. This should never happen. HORRIBLE ERROR.'
        )
      }
    }
  }
}

export const handler = (event, context, callback) =>
  dbBS()
    .then(() => {
      console.log('success')
      return callback(null, { status: 200, body: 'Success!' })
    })
    .catch((err) => {
      console.error(err)
      return callback(null, { status: 500, body: 'Error! ' + err })
    })
