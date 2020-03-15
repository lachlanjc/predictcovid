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

export const Success = ({ dailyCounts, countries = [] }) => {
  return (
    <>
      <pre>{JSON.stringify(countries)}</pre>
      {dailyCounts.map(count => <pre key={count.id}>{JSON.stringify(count)}</pre>)}
    </>
  )
}
