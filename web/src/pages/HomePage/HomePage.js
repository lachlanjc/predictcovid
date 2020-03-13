import { useState } from 'react'
import Social from 'src/components/Social'
import Countries from 'src/components/Countries'
import list from '../../countries.json'

const HomePage = () => {
  const countryList = {}
  Object.keys(list).forEach(c => countryList[c] = true)
  const [countries, setCountries] = useState(countryList)
  const toggleCountry = ({ target }) =>
    setCountries(c => ({ ...c, [target.id]: target.checked }))
  console.log(countries)

  return (
    <main>
      <link rel="stylesheet" href="https://windyhacks.com/fonts.css" />
      <Social />
      <h1>COVID-19 Tracker</h1>
      <p>By @zachlatta + @lachlanjc</p>
      <section>
        <aside>
          <Countries list={countries} onToggle={toggleCountry} />
        </aside>
        <article>
          <p>Chart goes here</p>
        </article>
      </section>
      <style jsx>{`
        main {
          max-width: 64rem;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        h1 {
          font-size: 3rem;
          line-height: 1.125;
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
        }
        article {
          border: 2px dashed #ddd;
          border-radius: 1rem;
          padding: 1rem 2rem;
        }
        @media (min-width: 48em) {
          section {
            grid-template-columns: 1fr 2fr;
          }
        }
      `}</style>
    </main>
  )
}

export default HomePage
