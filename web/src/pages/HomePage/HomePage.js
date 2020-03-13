import Social from 'src/components/Social'

const HomePage = () => {
  return (
    <main>
      <link rel="stylesheet" href="https://windyhacks.com/fonts.css" />
      <Social />
      <h1>COVID-19 Tracker</h1>
      <p>By @zachlatta + @lachlanjc</p>
      <section>
        <aside>
          <h2>Countries</h2>
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
        aside h2 {
          margin-top: 0;
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
