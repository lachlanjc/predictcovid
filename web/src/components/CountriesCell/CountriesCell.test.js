import { render, cleanup } from '@testing-library/react'

import { Loading, Empty, Failure, Success } from './CountriesCell'

describe('CountriesCell', () => {
  afterEach(() => {
    cleanup()
  })
  it('Loading renders successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })
  it('Empty renders successfully', () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })
  it('Failure renders successfully', () => {
    expect(() => {
      render(<Failure error={{ message: 'error message' }} />)
    }).not.toThrow()
  })
  it('Success renders successfully', () => {
    expect(() => {
      Success({
        countries: [
          { iso: 'itl', name: 'Italy' },
          { iso: 'chn', name: 'China' }
        ],
        enabledCountries: ['itl', 'chn'],
        defaultCountry: 'itl'
      })
    }).not.toThrow()
  })
})
