import { useState } from 'react'
import Social from 'src/components/Social'
import Settings from 'src/components/Settings'
import CountriesCell from 'src/components/CountriesCell'
import DailyCountsCell from 'src/components/DailyCountsCell'
import StatsCell from 'src/components/StatsCell'
import theme from 'src/theme'

const DEFAULT_COUNTRY = process.env.REDWOOD_ENV_DEFAULT_COUNTRY
const DEFAULT_COUNTRY_NAME = process.env.REDWOOD_ENV_DEFAULT_COUNTRY_NAME

const HomePage = () => {
  // const [log, setLog] = useState(false)
  const [defaultCountry, setDefaultCountry] = useState([DEFAULT_COUNTRY, DEFAULT_COUNTRY_NAME])
  const [enabledCountries, setEnabledCountries] = useState([
    'fra',
    'deu',
    'irn',
    'itl',
    'kor',
    'gbr',
    'esp',
    'usa',
    ...[DEFAULT_COUNTRY]
  ])

  return (
    <>
      <link rel="stylesheet" href="/fonts.css" key="fonts" />
      <header className="container">
        <h1>
          How many days each country’s outbreak is&nbsp;behind or ahead of
          {defaultCountry[1].startsWith('U') ? ' the ' : ' '}
          <strong>{defaultCountry[1]}</strong>
        </h1>
        <p>
          Visualize the 2020/2021 COVID-19 pandemic, country-to-country. This graph
          offsets each country since it last intersected with the selected
          country.
        </p>
      </header>
      <section className="container swap">
        <Settings>
          {/* <label>
            <input
              type="checkbox"
              name="log"
              checked={log}
              onChange={(e) => setLog(e.target.checked)}
            />
            Log scale
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
            defaultCountry={defaultCountry[0]}
            enabledCountries={enabledCountries}
          />
        </article>
      </section>
      <article className="container">
        <h2>
          Daily stats for {defaultCountry[1].startsWith('U') ? ' the ' : ' '}
          <strong>{defaultCountry[1]}</strong>
        </h2>
        <p>
          All case numbers are cases tested positive, which for some countries
          (such as the&nbsp;United States) reflects limited testing capacity.
        </p>
        <StatsCell country={defaultCountry[0]} />
      </article>
      <footer className="container">
        <Social
          text={`How many days each country’s outbreak is behind or ahead of ${defaultCountry[1]}`}
        />
        <p>
          Source: WHO via{' '}
          <a href="https://www.worldometers.info/coronavirus/">Worldometers</a>.
          No longer updated.
        </p>
        <p>
          View <a href="https://testing.predictcovid.com">COVID testing by state</a>.
        </p>
        <p>
          By <a href="https://lachlanjc.com">@lachlanjc</a> +{' '}
          <a href="https://zachlatta.com">@zachlatta</a>, 2020.
        </p>
        <p>
          <a href="https://github.com/lachlanjc/covid19">
            Open source on GitHub
          </a>
        </p>
      </footer>
      <style jsx>{`
        h1 {
          color: ${theme.colors.red};
          font-size: 2rem;
          max-width: 52rem;
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin-top: 0;
          margin-bottom: 1rem;
        }
        p {
          margin: 0 0 1rem;
          color: ${theme.colors.muted};
          max-width: 40rem;
          line-height: 1.75;
        }
        h1 strong,
        h2 strong {
          color: #fff;
          background-color: ${theme.colors.red};
          padding: 0 0.5rem;
          border-radius: 0.25rem;
          white-space: pre;
        }
        @media (prefers-color-scheme: dark) {
          p {
            color: ${theme.colors.snow};
          }
          h1 strong,
          h2 strong {
            color: ${theme.colors.dark};
          }
        }
        .container {
          max-width: 64rem;
          padding: 0 1rem;
          margin: 1rem auto;
        }
        section {
          display: grid;
          grid-gap: 2rem;
          margin: 0 auto 2rem !important;
        }
        footer {
          margin: 4rem auto 2rem !important;
          padding: 0 1rem;
          text-align: center;
        }
        footer p {
          margin: 0 auto 0.75rem;
        }
        footer a {
          color: ${theme.colors.blue};
          text-decoration: underline;
          text-decoration-line: underline;
          text-decoration-color: initial;
          text-underline-position: under;
        }
        @media (max-width: 32em) {
          section.swap article {
            grid-row: 1;
          }
          section.swap aside {
            grid-row: 2;
          }
        }
        @media (min-width: 36em) {
          header {
            padding-top: 2rem !important;
            margin-bottom: 0 !important;
          }
          section {
            grid-template-columns: 1fr 2fr;
          }
          footer {
            margin-bottom: 3rem !important;
          }
        }
        @media (min-width: 72em) {
          h1 {
            font-size: 2.5rem;
          }
          .container {
            max-width: 72rem;
            padding: 1rem;
          }
          section {
            grid-template-columns: 1fr 4fr;
          }
        }
      `}</style>
    </>
  )
}

export default HomePage
