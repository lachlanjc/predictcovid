import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line
} from 'recharts'
import { orderBy, groupBy, reverse } from 'lodash'
import commaNumber from 'comma-number'
import theme from 'src/theme'

const addDays = (date, days) => {
  let d = new Date(date)

  d.setDate(d.getDate() + days);

  return d
}

const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000

  return Math.round((date1.getTime() - date2.getTime()) / oneDay)
}

const calculateDayOffsets = (sortedDailyCounts = [], benchmarkCountryISO) => {
  const countryBenchmark = benchmarkCountryISO
  const countryCounts = groupBy(sortedDailyCounts, 'country.iso')
  const benchmarkCounts = countryCounts[countryBenchmark]
  const revBenchmarkCounts = reverse(benchmarkCounts)

  let countries = {}

  revBenchmarkCounts.forEach((count, i) => {
    if (i == revBenchmarkCounts.length - 1) return

    const currentCount = count
    const previousCount = revBenchmarkCounts[i + 1]

    for (const country in countryCounts) {
      const counts = countryCounts[country]

      counts.forEach((count) => {
        if (countries[country]) return

        if (
          count.totalCases < currentCount.totalCases &&
          count.totalCases > previousCount.totalCases
        ) {
          // console.log("MATCH FOUND")
          // console.log("count", count)
          // console.log("currentCount", currentCount)
          // console.log("previousCount", previousCount)
          // console.log("MATCH FOUND - DONE FOR", country)

          countries[country] = daysBetween(
            new Date(currentCount.date.date),
            new Date(count.date.date)
          )
        }
      })
    }
  })

  return countries
}

const yAxisFormatter = (i) =>
  i
    .toString()
    .replace(/0{6}$/, 'M')
    .replace(/0{3}$/, 'k')
const countryFromKey = (key) =>
  key
    .toString()
    .slice(0, 3)
    .toUpperCase()

const Chart = ({
  dailyCounts = [],
  countries = [],
  enabledCountries,
  defaultCountry,
  log
}) => {
  // sort dailyCounts for all later operations
  const sortedDailyCounts = orderBy(dailyCounts, 'date.date')
  const offsets = calculateDayOffsets(sortedDailyCounts, 'itl')
  console.log(offsets)

  const offsetDailyCounts = sortedDailyCounts.map(origCount => {
    // deep clone
    let count = JSON.parse(JSON.stringify(origCount))

    let offset = offsets[count.country.iso]
    if (!offset) { return count } // in case of benchmark

    let newDateStr = addDays(new Date(count.date.date), offset)

    // extract the YYYY-DD-MM portion
    count.date.date = new Date(newDateStr.toISOString().substring(0,10)).toISOString()

    return count
  })
  const sortedOffsetDailyCounts = orderBy(offsetDailyCounts, 'date.date')

  // Assemble chart display
  let days = {}

  sortedOffsetDailyCounts.forEach((count) => {
    days[count.date.date] = days[count.date.date] || {}

    days[count.date.date][`${count.country.iso}TotalCases`] = count.totalCases
    days[count.date.date][`${count.country.iso}TotalDeaths`] = count.totalDeaths
  })

  let readyForChart = []

  for (const day in days) {
    readyForChart.push({
      date: day,
      ...days[day]
    })
  }

  readyForChart = orderBy(readyForChart, 'date')

  console.log(readyForChart)

  return (
    <LineChart width={768} height={512} data={readyForChart}>
      <XAxis />
      <YAxis tickFormatter={yAxisFormatter} scale={log ? 'sqrt' : 'linear'} />
      <Tooltip
        separator=": "
        formatter={(value, key) => [commaNumber(value), countryFromKey(key)]}
      />
      <Legend formatter={countryFromKey} />
      <CartesianGrid stroke={theme.colors.snow} strokeDasharray="5 5" />
      <Line
        type="monotone"
        dataKey="chnTotalCases"
        stroke={theme.colors.red}
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="itlTotalCases"
        stroke={theme.colors.green}
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="usaTotalCases"
        stroke={theme.colors.blue}
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="korTotalCases"
        stroke={theme.colors.orange}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  )
}

export default Chart
