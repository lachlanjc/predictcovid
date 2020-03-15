import Chart from 'src/components/Chart'
import { find } from 'lodash'

export const QUERY = gql`
  query {
    countries {
      id
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
      country {
        id
        iso
        name
      }
      date {
        id
        date
      }
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
  console.log(dailyCounts)

  return (
    <>
      <Chart
        dailyCounts={dailyCounts}
        defaultCountry={defaultCountry}
        enabledCountries={enabledCountries}
        log={log}
      />
      <p>Plotting against: {find(countries, ['iso', defaultCountry]).name}</p>
      <p>
        Current countries:{' '}
        {enabledCountries
          .map((c) => find(countries, ['iso', c]).name)
          .join(', ')}
      </p>
      <style jsx>{`
        p {
          text-align: center;
          max-width: 24rem;
          margin: 1rem auto;
        }
      `}</style>
    </>
  )
}
