import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { startCase } from 'lodash'
import commaNumber from 'comma-number'
import theme from 'src/theme'

const Chart = ({ dailyCounts, countries }) => {
  return (
    <BarChart width={512} height={256} data={dailyCounts}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip separator=": " formatter={(value, name) => [commaNumber(value), startCase(name)]} />
      <Legend formatter={startCase} />
      <Bar dataKey="newCases" fill={theme.colors.cyan} />
      <Bar dataKey="newDeaths" fill={theme.colors.red} />
      <Bar dataKey="totalCases" fill={theme.colors.violet} />
      <Bar dataKey="currentlyInfected" fill={theme.colors.blue} />
    </BarChart>
  )
}

export default Chart
