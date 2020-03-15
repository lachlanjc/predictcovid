import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts'
import commaNumber from 'comma-number'
import theme from 'src/theme'

const StatChart = ({ data, dataKey, color }) => (
  <ResponsiveContainer width="100%" height={128}>
    <LineChart data={data}>
      <Tooltip
        separator=""
        formatter={(value) => [commaNumber(value)]}
        labelFormatter={() => ''}
      />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={theme.colors[color]}
        strokeWidth={3}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
)

export default StatChart
