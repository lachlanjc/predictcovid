import regions from 'src/countries.json'

const Countries = ({ list = {}, onToggle }) => (
  <>
    <h2>Countries</h2>
    {Object.keys(list).sort().map(code => (
      <label key={code} title={`${code}: ${list[code] ? 'Enabled' : 'Disabled'}`}>
        <input
          type="checkbox"
          id={code}
          onChange={onToggle}
          checked={!!list[code]}
        />
        {regions[code]} {list[code]}
      </label>
    ))}
  </>
)

export default Countries
