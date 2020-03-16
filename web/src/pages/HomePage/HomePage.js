import { useState } from 'react'
import Social from 'src/components/Social'
import Settings from 'src/components/Settings'
import CountriesCell from 'src/components/CountriesCell'
import DailyCountsCell from 'src/components/DailyCountsCell'
import StatsCell from 'src/components/StatsCell'
import theme from 'src/theme'

const HomePage = () => {
  // const [log, setLog] = useState(false)
  const [defaultCountry, setDefaultCountry] = useState('itl')
  const [enabledCountries, setEnabledCountries] = useState([
    'itl',
    'kor',
    'usa'
  ])

  return (
    <>
      <link rel="stylesheet" href="/fonts.css" key="fonts" />
      <header className="container">
        <Social />
        <h1>COVID-19 Country Tracker</h1>
        <p>
          Visualize & track each countries’ progress through the 2020 COVID-19
          pandemic.
        </p>
        <p>
          Data from{' '}
          <a href="https://www.worldometers.info/coronavirus/">Worldometers</a>.
        </p>
      </header>
      <section className="container">
        <Settings>
          {/* <label>
            <input
              type="checkbox"
              name="log"
              checked={log}
              onChange={(e) => setLog(e.target.checked)}
            />
            <strike>Log</strike>Square root scale
          </label> */}
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
          />
        </article>
      </section>
      <section className="container">
        <StatsCell />
      </section>
      <footer className="container">
        <p>
          By <a href="https://lachlanjc.me">@lachlanjc</a> +
          <a href="https://zachlatta.com">@zachlatta</a>, 2020.
        </p>
        <p>
          <a href="https://github.com/lachlanjc/covid19">Open source!</a>
        </p>
      </footer>
      <style jsx>{`
        header {
          padding-top: 3rem !important;
        }
        h1 {
          color: ${theme.colors.red};
          font-size: 3rem;
          line-height: 1.125;
          letter-spacing: -0.02em;
          margin-top: 0;
          margin-bottom: 1rem;
        }
        h1 + p {
          margin: 0;
          color: ${theme.colors.muted};
        }
        @media (prefers-color-scheme: dark) {
          h1 + p {
            color: ${theme.colors.snow};
          }
        }
        section {
          margin: 0 auto 2rem !important;
        }
        .container,
        footer p {
          max-width: 64rem;
          padding: 0 1rem;
          margin: auto;
        }
        section {
          display: grid;
          grid-gap: 2rem;
        }
        @media (min-width: 48em) {
          section {
            grid-template-columns: 1fr 2fr;
          }
        }
        @media (min-width: 72em) {
          .container {
            max-width: 72rem;
            padding: 2rem 1rem;
          }
          section {
            grid-template-columns: 1fr 4fr;
          }
        }
        footer {
          margin: 4rem auto 3rem;
          padding: 2rem 1rem;
          text-align: center;
        }
        header a,
        footer a {
          color: ${theme.colors.blue};
          text-decoration: underline;
          text-decoration-line: underline;
          text-decoration-color: initial;
          text-underline-position: under;
        }
      `}</style>
    </>
  )
}

export default HomePage
