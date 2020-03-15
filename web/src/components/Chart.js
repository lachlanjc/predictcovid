import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { startCase } from 'lodash'
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
  return (
    <BarChart width={768} height={512} data={dailyCounts}>
      <XAxis dataKey="date.date" tickFormatter={xAxisFormatter} />
      <YAxis tickFormatter={yAxisFormatter} scale={log ? 'sqrt' : 'linear'} />
      <Tooltip
        separator=": "
        formatter={(value, name) => [commaNumber(value), startCase(name)]}
      />
      <Legend formatter={startCase} />
      <Bar dataKey="newDeaths" stackId="date.date" fill={theme.colors.red} />
      <Bar dataKey="newCases" stackId="date.date" fill={theme.colors.cyan} />
      <Bar
        dataKey="currentlyInfected"
        stackId="date.date"
        fill={theme.colors.blue}
      />
      <Bar
        dataKey="totalCases"
        stackId="date.date"
        fill={theme.colors.violet}
      />
    </BarChart>
  )
}

export default Chart
