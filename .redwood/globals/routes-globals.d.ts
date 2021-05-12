import type FatalErrorPageType from '/Users/delong/dev/covid19/web/src/pages/FatalErrorPage/FatalErrorPage'
import type HomePageType from '/Users/delong/dev/covid19/web/src/pages/HomePage/HomePage'
import type NotFoundPageType from '/Users/delong/dev/covid19/web/src/pages/NotFoundPage/NotFoundPage'

declare global {
  const FatalErrorPage: typeof FatalErrorPageType
  const HomePage: typeof HomePageType
  const NotFoundPage: typeof NotFoundPageType
}
