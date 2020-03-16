import { Facebook, Twitter } from 'react-feather'

const url = 'https://countrycovid19.netlify.com'
const esc = (t) => t.split(' ').join('%20')
const twitterURL = (text, u = url) =>
  `https://twitter.com/intent/tweet?text=${esc(text)}&url=${u}`
const facebookURL = (u = url) =>
  `https://www.facebook.com/sharer/sharer.php?u=${u}`

const ShareButton = ({ service, children, ...props }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Share on ${service}`}
    {...props}
  >
    {children}
    <style jsx>{`
      a {
        display: inline-block;
        text-decoration: none;
        margin-right: 2rem;
        color: #fff;
      }
    `}</style>
  </a>
)

const Social = () => (
  <section>
    <ShareButton
      href={twitterURL('Interactive COVID-19 country tracker', url)}
      service="Twitter"
    >
      <Twitter />
    </ShareButton>
    <ShareButton href={facebookURL(url)} service="Facebook">
      <Facebook />
    </ShareButton>
    <style jsx>{`
      section {
        display: flex;
        margin-bottom: 1rem;
      }
      @media (min-width: 48em) {
        section {
          float: right;
          margin-right: -2rem;
          margin-top: 1rem;
        }
      }
    `}</style>
  </section>
)

export default Social
