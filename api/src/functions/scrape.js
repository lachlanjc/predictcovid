// TODO DB lock when scraping is running
import fetch from 'isomorphic-unfetch'
import cheerio from 'cheerio'
import { db } from '../lib/db'

// data returns in format: { "2020-02-28": 324, "2020-02-29": 500 }
const extractDataFromChart = function($, chartId) {
  const chartParent = $(`div#${chartId}`).parent()
  /** @type string */
  // sometimes it's the parent, sometimes parent * 4
  const htmlAttempt = chartParent.find('script').html() || chartParent.parent().parent().parent().find('script').html();;

  const hackedChartJSON = htmlAttempt.split('Highcharts.chart(')[1];

  const xAxisCategories = hackedChartJSON.match(/xAxis:.*?{.*?categories\:.*?(\[.*?\])/s)

  if (!xAxisCategories) {
    console.log('cannot find xAxis categories', hackedChartJSON.substr(hackedChartJSON.indexOf('xAxis'), 200));

    throw new Error('cannot get xAxis for', chartId)
  }

  const xVals = JSON.parse(xAxisCategories[1])

  const seriesData = hackedChartJSON.match(/series:.*?data:.*?(\[.*?\])/s)

  if (!seriesData) {
    console.log('cannot find series data', hackedChartJSON.substr(hackedChartJSON.indexOf('series'), 200));

    throw new Error('cannot get series data for', chartId)
  }

  const yVals = JSON.parse(seriesData[1])

  console.log("parsed chart json!")

  let data = {}

  xVals.forEach((val, i) => {
    const day = new Date(val)

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
      const date = new Date(day);
      const dbDay = await db.day.upsert({
        update: { date: date },
        where: { date: date },
        create: { date: date }
      })

      const foundCounts = await db.dailyCount.findMany({
        where: {
          country: { id: country.id },
          date: { id: dbDay.id }
        }
      })

      const {
        totalCases,
        newCases,
        currentlyInfected,
        totalDeaths,
        newDeaths
      } = data[day]

      if (foundCounts.length === 0) {
        console.log(
          `Adding ${country.name} ${day}`
        )
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
      } else if (foundCounts.length === 1) {
        console.log(
          `Updating ${country.name} ${day}`
        )
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

export const handler = async (event, context) => {
  try {
    await dbBS()
    console.log('success')
    return {
      statusCode: 200,
      body: JSON.stringify('Success!')
    }
  } catch (e) {
    console.error(e)

    return {
      statusCode: 500,
      body: JSON.stringify('Error! ' + e)
    }
  }
}