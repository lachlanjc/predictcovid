import { useState, useEffect } from 'react'
import Spinner from 'respin'
import Settings from 'src/components/Settings'
import Stat from 'src/components/StatsCell/Stat'
import StatChart from 'src/components/StatsCell/StatChart'
import commaNumber from 'comma-number'
import { map, find, last, trim, orderBy } from 'lodash'

const DEFAULT_COUNTRY = process.env.REDWOOD_ENV_DEFAULT_COUNTRY

export const QUERY = gql`
  query {
    countries {
      iso
      name
      dailyCounts {
        newCases
        currentlyInfected
        totalCases
        totalDeaths
        date {
          date
        }
      }
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>No stats found</div>

export const Failure = ({ error }) => (
  <div>
    Error: <pre>{error.message}</pre>
  </div>
)

// The IPInfo service uses 2-letter codes :(
// Hardcoding switching these over to the 3-letter codes our database uses
const list = {
  CN: 'chn',
  DE: 'deu',
  ES: 'esp',
  FR: 'fra',
  GB: 'gbr',
  IR: 'irn',
  IT: 'itl',
  KR: 'kor',
  US: 'usa'
}

export const Success = ({ countries = [], country = DEFAULT_COUNTRY }) => {
  // Calculate stats
  const [counts, setCounts] = useState([])
  const stat = (key) =>
    commaNumber(last(map(orderBy(counts, 'date.date'), key)))
  useEffect(() => {
    setCounts(find(countries, ['iso', country])?.dailyCounts)
  }, [country])

  return (
    <div>
      <section>
        <StatChart data={counts} dataKey="newCases" color="green" />
        <Stat value={stat('newCases')} label="New cases" />
      </section>
      <section>
        <StatChart data={counts} dataKey="currentlyInfected" color="yellow" />
        <Stat value={stat('currentlyInfected')} label="Currently infected" />
      </section>
      <section>
        <StatChart data={counts} dataKey="totalCases" color="orange" />
        <Stat value={stat('totalCases')} label="Confirmed cases" />
      </section>
      <section>
        <StatChart data={counts} dataKey="totalDeaths" color="red" />
        <Stat value={stat('totalDeaths')} label="Confirmed deaths" />
      </section>
      <style jsx>{`
        div {
          display: grid;
          grid-gap: 1rem;
          margin-top: 2rem;
        }
        @media (min-width: 48em) {
          div {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        section {
          position: relative;
          min-height: 8rem;
        }
        section :global(.recharts-responsive-container) {
          position: absolute !important;
          top: 0;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
  )
}
