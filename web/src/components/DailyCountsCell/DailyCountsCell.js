import Chart from 'src/components/Chart'
import Spinner from 'respin'
import theme from 'src/theme'
import { filter } from 'lodash'

const DEFAULT_COUNTRY = process.env.REDWOOD_ENV_DEFAULT_COUNTRY

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
      currentlyInfected
      country {
        id
        iso
        name
      }
      date {
        id
        date
        createdAt
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
        border: 1px dashed ${theme.colors.muted};
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
  defaultCountry = DEFAULT_COUNTRY
  // log = false
}) => {
  const filteredCounts = filter(dailyCounts, (count) =>
    enabledCountries.includes(count.country.iso)
  )

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
