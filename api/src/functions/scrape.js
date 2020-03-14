// TODO DB lock when scraping is running
import fetch from 'isomorphic-unfetch'
import cheerio from 'cheerio'

const COUNTRIES = [
  'china',
  'italy',
  'iran',
  'south-korea',
  'spain',
  'germany',
  'france',
  'us',
  'uk'
]

// data returns in format: { "2020-02-28": 324, "2020-02-29": 500 }
const extractDataFromChart = function($, chartId) {
  let htmlAttempt = $('div#' + chartId + ' + div > script').html()

  // sometimes charts have a div wrapping the following script tag, sometimes they don't
  if (!htmlAttempt) {
    htmlAttempt = $('div#' + chartId + ' + script').html()
  }

  const hackedChartJSON = htmlAttempt.replace(/^.*?{/, '{').replace(/\); ?$/, '').replace(/([A-z]+):/g, '"$1":').replace(/'/g, '"')

  console.log(hackedChartJSON)

  const json = JSON.parse(hackedChartJSON)
  const xVals = json.xAxis.categories
  const yVals = json.series[0].data

  let data = {}

  xVals.forEach((val, i) => {
    // need to manually set year to 2020
    let day = new Date(val)
    day.setFullYear(2020)

    // converts date from "Feb 24" to YYYY-MM-DD
    const fmtedDay = day.toISOString().split('T')[0]

    data[fmtedDay] = yVals[i] || 0
  })

  return data
}

// ex. data = { "2020-02-28": { confirmedCases: 43 } }, new cases = { "2020-02-28": 23 }, keyForData = "newCases"
//
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
  const html = await fetch('https://www.worldometers.info/coronavirus/country/' + country + '/').then(r => r.text())

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

const scrapeAllCountryData = async function() {
  const data = {}

  for (const country of COUNTRIES) {
    data[country] = await scrapeCases(country)
  }

  return data
}

export const handler = (event, context, callback) => {
  scrapeAllCountryData()
    .then(data => {
      return callback(null, { status: 200, body: '' + JSON.stringify(data) })
    })
    .catch(err => {
      return callback(null, { status: 500, body: "Error! " + err })
    })
}
