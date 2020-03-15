import { LineChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, Line } from 'recharts'
import { startCase, sortBy } from 'lodash'
import commaNumber from 'comma-number'
import theme from 'src/theme'

const yAxisFormatter = (i) =>
  i
    .toString()
    .replace(/0{6}$/, 'M')
    .replace(/0{3}$/, 'k')
const xAxisFormatter = (t) =>
  new Date(t).toLocaleDateString().replace(/\/?2020-?/, '')

const Chart = ({ dailyCounts, enabledCountries, defaultCountry, log }) => {
  console.log(dailyCounts)

  let days = {}

  dailyCounts.forEach(count => {
    console.log(count)

    days[count.date.date] = days[count.date.date] || {}

    days[count.date.date][count.country.iso + 'TotalCases'] = count.totalCases
    days[count.date.date][count.country.iso + 'TotalDeaths'] = count.totalDeaths
  })

  let readyForChart = []

  for (const day in days) {
    readyForChart.push({
      date: day,
      ...days[day],
    })
  }

  readyForChart = sortBy(readyForChart, 'date')

  return (
    <LineChart width={500} height={300} data={readyForChart}>
      <XAxis/>
      <YAxis/>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <Line type="monotone" dataKey="chnTotalCases" stroke="#ff0000" />
      <Line type="monotone" dataKey="itlTotalCases" stroke="#8884d8" />
      <Line type="monotone" dataKey="usaTotalCases" stroke="#82ca9d" />
      <Line type="monotone" dataKey="korTotalCases" />
    </LineChart>
  )
}

export default Chart
