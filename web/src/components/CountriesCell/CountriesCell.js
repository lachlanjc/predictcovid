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
  const changeDefault = ({ target: { value } }) => {
    setDefaultCountry([value, find(countries, ['iso', value]).name])
    // Enable on graph if it’s not alreadythere
    if (!enabledCountries.includes(value)) {
      setEnabledCountries((c) => concat(c, value))
    }
  }
  const toggleEnabled = ({ target: { id } }) =>
    setEnabledCountries((c) =>
      c.includes(id) ? filter(c, (cc) => cc !== id) : concat(c, id)
    )
  const enabledTooltip = (iso) =>
    `${iso.toUpperCase()}: ${
      enabledCountries.includes(iso)
        ? defaultCountry === iso
          ? 'Plotting against'
          : 'Enabled'
        : 'Not plotting'
    }`

  return (
    <>
      <label htmlFor="defaultCountry">Plot against</label>
      <div>
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
        <span
          style={{
            backgroundColor: theme.colors[defaultCountry],
            marginLeft: 'auto'
          }}
        />
      </div>
      <h2>Countries</h2>
      {/* America! */}
      <label title={enabledTooltip('usa')}>
        <input
          type="checkbox"
          id="usa"
          onChange={toggleEnabled}
          checked={enabledCountries.includes('usa')}
          disabled={defaultCountry === 'usa'}
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
              disabled={defaultCountry === iso}
            />
            {name}
            <span style={{ backgroundColor: theme.colors[iso] }} />
          </label>
        ))}
      <style jsx>{`
        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 6px;
          margin-left: auto;
        }
        label + div {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  )
}
