import { find, orderBy, filter, concat } from 'lodash'
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
  const changeDefault = ({ target: { value } }) =>
    setDefaultCountry([value, find(countries, ['iso', value]).name])
  const toggleEnabled = ({ target: { id } }) => {
    console.log(countries, id, countries.includes(id))
    setEnabledCountries((c) =>
      c.includes(id) ? filter(c, (cc) => cc !== id) : concat(c, id)
    )
  }
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
      {/* America! */}
      <label title={enabledTooltip('usa')}>
        <input
          type="checkbox"
          id="usa"
          onChange={toggleEnabled}
          checked={enabledCountries.includes('usa')}
        />
        United States
        <span style={{ backgroundColor: theme.colors.usa }} />
      </label>
      {orderBy(countries, 'name')
        .filter((c) => c.iso !== 'usa')
        .map(({ iso, name }) => (
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
