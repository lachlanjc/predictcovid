import Chart from 'src/components/Chart'
import { find } from 'lodash'

export const QUERY = gql`
  query {
    countries {
      iso
      name
    }
    dailyCounts {
      id
      totalCases
      newCases
      currentlyInfected
      totalDeaths
      newDeaths
    }
  }
`

export const Loading = () => <div>Loading chart…</div>

export const Empty = () => <div>No COVID-19 data found</div>

export const Failure = ({ error }) => (
  <div>
    Error: <pre>{error.message}</pre>
  </div>
)

export const Success = ({
  // Query data
  dailyCounts = [],
  countries = [],
  // Inherited read-only from hooks
  enabledCountries = [],
  defaultCountry = 'itl',
  log = false
}) => {
  return (
    <>
      <p>Plotting against: {defaultCountry}</p>
      <p>Current countries: {enabledCountries.join(', ')}</p>
      <Chart
        dailyCounts={dailyCounts}
        defaultCountry={defaultCountry}
        enabledCountries={enabledCountries}
        log={log}
      />
    </>
  )
}
