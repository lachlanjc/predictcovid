import { orderBy, remove, concat } from 'lodash'

export const QUERY = gql`
  query {
    countries {
      iso
      name
      worldometersSlug
    }
  }
`

export const Loading = () => <div>Loading countries…</div>

export const Empty = () => <div>No countries found</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({
  // Query data
  countries = [],
  // Inherited hooks
  enabledCountries,
  setEnabledCountries,
  defaultCountry,
  setDefaultCountry
}) => {
  const changeDefault = ({ target }) => setDefaultCountry(target.value)
  const toggleEnabled = ({ target: { id } }) =>
  setEnabledCountries((c) => c.includes(id) ? remove(c, id) : concat(c, id))
  const enabledTooltip = iso => `${iso.toUpperCase()}: ${
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
        </label>
      ))}
    </>
  )
}
