import { find, orderBy, filter, concat } from 'lodash'
import Spinner from 'respin'
import theme from 'src/theme'

const variables = {}

// https://redwoodjs.com/docs/cells#beforequery
export const beforeQuery = () => {
  return {
    // never change query with new variables
    variables,
    fetchPolicy: 'cache-and-network',
    // countries don't change mid-session
    nextFetchPolicy: 'no-cache'
  }
}

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
  const orderedCountries = orderBy(countries, 'name');
  const [defaultIso, defaultName] = defaultCountry
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
        ? defaultIso === iso
          ? 'Plotting against'
          : 'Enabled'
        : 'Not plotting'
    }`

  return (
    <>
      <label htmlFor="defaultCountry">Primary country</label>
      <div>
        <select
          name="defaultCountry"
          value={defaultIso}
          onChange={changeDefault}
        >
          {orderedCountries.map((c) => (
            <option key={c.iso} value={c.iso}>
              {c.name}
            </option>
          ))}
        </select>
        <span
          style={{
            backgroundColor: theme.colors[defaultIso],
            marginLeft: 'auto'
          }}
        />
      </div>
      <p>The other countries will plot against this country.</p>
      <h2>Show countries</h2>
      {/* America! */}
      <label title={enabledTooltip(defaultIso)}>
        <input
          type="checkbox"
          id={defaultIso}
          onChange={toggleEnabled}
          checked={enabledCountries.includes(defaultIso)}
          disabled
        />
        {defaultName}
        <span style={{ backgroundColor: theme.colors[defaultIso] }} />
      </label>
      {orderedCountries
        .filter((c) => c.iso !== defaultIso)
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
