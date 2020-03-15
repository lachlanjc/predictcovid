import { useState } from 'react'
import Social from 'src/components/Social'
import Settings from 'src/components/Settings'
import CountriesCell from 'src/components/CountriesCell'
import DailyCountsCell from 'src/components/DailyCountsCell'
import StatsCell from 'src/components/StatsCell'
import theme from 'src/theme'

const HomePage = () => {
  const [log, setLog] = useState(false)
  const [defaultCountry, setDefaultCountry] = useState('itl')
  const [enabledCountries, setEnabledCountries] = useState([])

  return (
    <main>
      {/* <link rel="stylesheet" href="https://windyhacks.com/fonts.css" /> */}
      <Social />
      <h1>COVID-19 Country Tracker</h1>
      <p>Track all the countries’ pandemic progress</p>
      <section>
        <Settings>
          <label>
            <input
              type="checkbox"
              name="log"
              checked={log}
              onChange={(e) => setLog(e.target.checked)}
            />
            <strike>Log</strike>Square root scale
          </label>
          <CountriesCell
            enabledCountries={enabledCountries}
            setEnabledCountries={setEnabledCountries}
            defaultCountry={defaultCountry}
            setDefaultCountry={setDefaultCountry}
          />
        </Settings>
        <article>
          <DailyCountsCell
            defaultCountry={defaultCountry}
            enabledCountries={enabledCountries}
            log={log}
          />
        </article>
      </section>
      <section>
        <StatsCell />
      </section>
      <footer>
        <p>
          By <a href="https://zachlatta.com">@zachlatta</a> +{' '}
          <a href="https://lachlanjc.me">@lachlanjc</a>, 2020.
        </p>
        <p>
          <a href="https://github.com/lachlanjc/covid19">Open source!</a>
        </p>
      </footer>
      <style jsx>{`
        main {
          max-width: 64rem;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        h1 {
          font-size: 3rem;
          line-height: 1.125;
          letter-spacing: -0.02em;
          margin-top: 0;
          margin-bottom: 0;
        }
        h1 + p {
          margin-top: 1rem;
          margin-bottom: 3rem;
        }
        section {
          display: grid;
          grid-gap: 2rem;
          margin-bottom: 3rem;
        }
        @media (min-width: 48em) {
          section {
            grid-template-columns: 1fr 2fr;
          }
        }
        footer {
          padding: 2rem 1rem;
          text-align: center;
        }
        footer a {
          color: ${theme.colors.blue};
          text-decoration-line: underline;
          text-decoration-color: initial;
          text-decoration: underline;
          text-underline-position: under;
          text-decoration-style: wavy;
        }
      `}</style>
    </main>
  )
}

export default HomePage
