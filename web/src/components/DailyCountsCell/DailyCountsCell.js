import Chart from 'src/components/Chart'

export const QUERY = gql`
  query {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: <pre>{error.message}</pre></div>

export const Success = ({ dailyCounts, countries = [], log = false }) => {
  return (
    <>
      <p>Current countries: {countries.join(', ')}</p>
      <Chart dailyCounts={dailyCounts} countries={countries} log={log} />
    </>
  )
}
