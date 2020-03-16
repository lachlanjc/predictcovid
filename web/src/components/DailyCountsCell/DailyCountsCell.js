import Chart from 'src/components/Chart'
import Spinner from 'respin'
import theme from 'src/theme'
import { filter } from 'lodash'

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

export const Loading = () => (
  <div>
    <Spinner size={72} />
    <style jsx>{`
      div {
        width: 100%;
        height: 12rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed ${theme.colors.muted};
      }
      @media (min-width: 48em) {
        div {
          height: 32rem;
        }
      }
    `}</style>
  </div>
)

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
  defaultCountry = 'itl'
  // log = false
}) => {
  const filteredCounts = filter(dailyCounts, (count) =>
    enabledCountries.includes(count.country.iso)
  )
  console.log(filteredCounts)

  return (
    <Chart
      dailyCounts={filteredCounts}
      defaultCountry={defaultCountry}
      enabledCountries={enabledCountries}
      countries={countries}
      // log={log}
    />
  )
}
