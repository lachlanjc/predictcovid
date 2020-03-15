import { useState, useEffect } from 'react'
import Spinner from 'respin'
import Settings from 'src/components/Settings'
import Stat from 'src/components/Stat'
import commaNumber from 'comma-number'
import { map, find, last, trim } from 'lodash'

export const QUERY = gql`
  query {
    countries {
      iso
      name
      dailyCounts {
        totalCases
        newCases
        currentlyInfected
        totalDeaths
        newDeaths
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
  GB: 'gbr',
  US: 'usa',
  DE: 'deu',
  ES: 'esp',
  KR: 'kor',
  IT: 'itl',
  CN: 'chn',
  IR: 'irn'
}

export const Success = ({ countries = [] }) => {
  const [country, setCountry] = useState('usa')
  const changeCountry = ({ target: { value } }) => setCountry(value)

  // Automatically set country
  useEffect(() => {
    fetch('https://ipinfo.io/country?token=44ae4f170b445a')
      .then((r) => r.text())
      .then((t) => trim(t))
      .then((co) => {
        // If you’re in a country our database represents
        if (Object.keys(list).includes(co)) setCountry(list[co])
      })
  }, [])

  // Calculate stats
  const [totalCases, setTotalCases] = useState(0)
  const [totalDeaths, setTotalDeaths] = useState(0)
  const [currentlyInfected, setCurrentlyInfected] = useState(0)
  useEffect(() => {
    const counts = find(countries, ['iso', country])?.dailyCounts
    const stat = (key) => last(map(counts, key).sort())

    setCurrentlyInfected(stat('currentlyInfected'))
    setTotalCases(stat('totalCases'))
    setTotalDeaths(stat('totalDeaths'))
  }, [country])

  return (
    <>
      <Settings>
        <h2>Live stats</h2>
        <label htmlFor="country">Select country</label>
        <select name="country" value={country} onChange={changeCountry}>
          {countries.map((c) => (
            <option key={c.iso} value={c.iso}>
              {c.name}
            </option>
          ))}
        </select>
      </Settings>
      <article>
        <Stat
          value={commaNumber(currentlyInfected)}
          label="Currently infected"
        />
        <Stat value={commaNumber(totalCases)} label="Total cases" />
        <Stat value={commaNumber(totalDeaths)} label="Total deaths" />
      </article>
      <style jsx>{`
        article {
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
        }
      `}</style>
    </>
  )
}
