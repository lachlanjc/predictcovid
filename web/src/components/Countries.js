import theme from 'src/theme'
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
    <style jsx>{`
      h2 {
        margin-top: 0;
      }
      label {
        font-family: ${theme.fonts.serif};
        display: flex;
        align-items: center;
        padding-bottom: 0.5rem;
      }
      input {
        margin-right: 0.5rem;
      }
    `}</style>
  </>
)

export default Countries
