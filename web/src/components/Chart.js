import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { startCase } from 'lodash'
import commaNumber from 'comma-number'
import theme from 'src/theme'

const Chart = ({ dailyCounts, enabledCountries, defaultCountry, log }) => {
  return (
    <BarChart width={768} height={512} data={dailyCounts}>
      <XAxis dataKey="name" />
      <YAxis
        tickFormatter={(i) => i.toString().replace(/0{6}$/, 'M').replace(/0{3}$/, 'k')}
        scale={log ? 'sqrt' : 'linear'}
      />
      <Tooltip
        separator=": "
        formatter={(value, name) => [commaNumber(value), startCase(name)]}
      />
      <Legend formatter={startCase} />
      <Bar dataKey="newDeaths" fill={theme.colors.red} />
      <Bar dataKey="newCases" fill={theme.colors.cyan} />
      <Bar dataKey="currentlyInfected" fill={theme.colors.blue} />
      <Bar dataKey="totalCases" fill={theme.colors.violet} />
    </BarChart>
  )
}

export default Chart
