import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line
} from 'recharts'
import { sortBy } from 'lodash'
import commaNumber from 'comma-number'
import theme from 'src/theme'

const yAxisFormatter = (i) =>
  i
    .toString()
    .replace(/0{6}$/, 'M')
    .replace(/0{3}$/, 'k')
const countryFromKey = key => key.toString().slice(0, 3).toUpperCase()

const Chart = ({
  dailyCounts = [],
  countries = [],
  enabledCountries,
  defaultCountry,
  log
}) => {
  let days = {}

  dailyCounts.forEach((count) => {
    console.log(count)

    days[count.date.date] = days[count.date.date] || {}

    days[count.date.date][count.country.iso + 'TotalCases'] = count.totalCases
    days[count.date.date][count.country.iso + 'TotalDeaths'] = count.totalDeaths
  })

  let readyForChart = []

  for (const day in days) {
    readyForChart.push({
      date: day,
      ...days[day]
    })
  }

  readyForChart = sortBy(readyForChart, 'date')

  return (
    <LineChart width={768} height={512} data={readyForChart}>
      <XAxis />
      <YAxis tickFormatter={yAxisFormatter} scale={log ? 'sqrt' : 'linear'} />
      <Tooltip
        separator=": "
        formatter={(value, key) => [commaNumber(value), countryFromKey(key)]}
      />
      <Legend
        formatter={countryFromKey}
      />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="chnTotalCases" stroke={theme.colors.red} activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="itlTotalCases" stroke={theme.colors.green} activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="usaTotalCases" stroke={theme.colors.blue} activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="korTotalCases" stroke={theme.colors.orange} activeDot={{ r: 8 }} />
    </LineChart>
  )
}

export default Chart
