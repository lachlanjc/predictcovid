const neatCSV = require('neat-csv')
const fetch = require('isomorphic-unfetch')

let finData = null
let lastUpdated = null

const parseJSON = (total, deaths, recovered) => {
  const final = {}
  total.forEach((e, i) => {
    const death = deaths.filter(
      (d) =>
        d['Country/Region'].toLowerCase() == e['Country/Region'].toLowerCase()
    )
    const recover = recovered.filter(
      (d) =>
        d['Country/Region'].toLowerCase() == e['Country/Region'].toLowerCase()
    )
    if (final[e['Country/Region'].toLowerCase()] === undefined) {
      final[e['Country/Region'].toLowerCase()] = []
    }
    let dates = Object.keys(e).filter(
      (key) =>
        !['Province/State', 'Country/Region', 'Lat', 'Long'].includes(key)
    )
    dates.forEach((date) => {
      let prev = new Date(date)
      prev.setDate(prev.getDate() - 1)
      prev = `${prev.getMonth() + 1}/${prev.getDate()}/${prev
        .getFullYear()
        .toString()
        .substr(-2)}`
      console.log(e['Country/Region'], date, e[date])
      const prevCases = parseInt(e[prev])
      const totalCases = parseInt(e[date])
      const totalDeaths = parseInt(death[0][date])
      const totalRecovered = parseInt(recover[0][date])

      // console.log(e['Country/Region'], date, e[date])
      // date:: new Date(date).toISOString().split('T')[0]
      final[e['Country/Region'].toLowerCase()].push({
        date,
        totalCases,
        newCases: totalCases - (e[prev] == undefined ? 0 : prevCases),
        caseMultiple: parseFloat(totalCases / prevCases).toFixed(3),
        totalDeaths,
        newDeaths:
          totalDeaths -
          (death[0][prev] == undefined ? 0 : parseInt(death[0][prev])),
        totalRecovered,
        currentlyInfected: totalCases - totalDeaths - totalRecovered
      })
    })
  })
  finData = final
  return final
}

const merge = (data) => {
  let countries = data.map((e) => e['Country/Region'])
  let multiCountries = countries.filter(
    (e) => data.filter((j) => j['Country/Region'] == e).length > 1
  )
  multiCountries = [...new Set(multiCountries)]
  multiCountries.forEach((e) => {
    let points = data.filter((j) => j['Country/Region'] == e)
    data = data.filter((j) => j['Country/Region'] != e)
    let agg = points[0]
    let dates = Object.keys(e).filter(
      (key) =>
        !['Province/State', 'Country/Region', 'Lat', 'Long'].includes(key)
    )
    dates.forEach((date) => {
      agg[date] = parseInt(agg[date])
    })
    dates.forEach((date) => {
      points.slice(1).forEach((p) => {
        agg[date] += parseInt(p[date])
      })
    })

    data.push(agg)
  })
  return data
}

const fetchCSV = async () => {
  lastUpdated = new Date().toGMTString()
  const urls = [
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv',
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv',
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'
  ]
  return Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((res) => res.text())
        .then((csv) => neatCSV(csv))
    )
  ).then(([d, t, c]) => parseJSON(merge(d), merge(t), merge(c)))
}

export const handler = (event, context, callback) =>
  fetchCSV()
    .then(() => callback(null, { status: 200, body: finData }))
    .catch((err) => callback(null, { status: 500, body: 'Error! ' + err }))
