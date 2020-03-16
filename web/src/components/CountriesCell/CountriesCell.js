import { useEffect } from 'react'
import { map, orderBy, remove, concat } from 'lodash'
import Spinner from 'respin'
import theme from 'src/theme'

export const QUERY = gql`
  query {
    countries {
      iso
      name
      worldometersSlug
    }
  }
`

export const Loading = () => (
  <div>
    <Spinner size={48} />
    <h2>Countries</h2>
  </div>
)

export const Empty = () => <div>No countries found</div>

export const Failure = ({ error }) => (
  <div>
    Error: <pre>{error.message}</pre>
  </div>
)

export const Success = ({
  // Query data
  countries = [],
  // Inherited hooks
  enabledCountries,
  setEnabledCountries,
  defaultCountry,
  setDefaultCountry
}) => {
  const changeDefault = ({ target: { value } }) => setDefaultCountry(value)
  const toggleEnabled = ({ target: { id } }) => {
    console.log(countries, id, countries.includes(id))
    setEnabledCountries((c) => (c.includes(id) ? remove(c, id) : concat(c, id)))
  }
  useEffect(() => {
    if (defaultCountry === 'itl' && enabledCountries.length === 0) {
      setEnabledCountries(map(countries, 'iso'))
    }
  }, [])
  const enabledTooltip = (iso) =>
    `${iso.toUpperCase()}: ${
      enabledCountries.includes(iso) ? 'Enabled' : 'Disabled'
    }`

  return (
    <>
      <label htmlFor="defaultCountry">Plot against</label>
      <select
        name="defaultCountry"
        value={defaultCountry}
        onChange={changeDefault}
      >
        {countries.map((c) => (
          <option key={c.iso} value={c.iso}>
            {c.name}
          </option>
        ))}
      </select>
      <h2>Countries</h2>
      {orderBy(countries, 'name').map(({ iso, name }) => (
        <label key={iso} title={enabledTooltip(iso)}>
          <input
            type="checkbox"
            id={iso}
            onChange={toggleEnabled}
            checked={enabledCountries.includes(iso)}
          />
          {name}
          <span style={{ backgroundColor: theme.colors[iso] }} />
        </label>
      ))}
      <style jsx>{`
        label span {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 6px;
          margin-left: auto;
        }
      `}</style>
    </>
  )
}
