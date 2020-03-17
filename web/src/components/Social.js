import { Facebook, Twitter, GitHub } from 'react-feather'
import theme from 'src/theme'

const url = 'https://predictcovid.com'
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
  </a>
)

const Social = ({ text }) => (
  <section>
    <ShareButton href={twitterURL(text, url)} service="Twitter">
      <Twitter />
    </ShareButton>
    <ShareButton href={facebookURL(url)} service="Facebook">
      <Facebook />
    </ShareButton>
    <a href="https://github.com/lachlanjc/covid19">
      <GitHub />
    </a>
    <style jsx>{`
      section {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
      }
      section :global(a) {
        display: inline-block;
        text-decoration: none;
        padding-left: 0.5rem;
        margin-right: 2rem;
        color: ${theme.colors.red};
      }
    `}</style>
  </section>
)

export default Social
