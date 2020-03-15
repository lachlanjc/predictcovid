import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { startCase } from 'lodash'
import theme from 'src/theme'

const Chart = ({ dailyCounts, countries }) => {
  return (
    <BarChart width={512} height={256} data={dailyCounts}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value, name) => [value, startCase(name)]} />
      <Legend formatter={startCase} />
      <Bar dataKey="newCases" fill={theme.colors.blue} />
      <Bar dataKey="newDeaths" fill={theme.colors.red} />
      {/* <Bar dataKey="currentlyInfected" fill={theme.colors.snow} /> */}
    </BarChart>
  )
}

export default Chart
