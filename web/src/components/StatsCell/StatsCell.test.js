import { render, cleanup } from '@testing-library/react'

import { Loading, Empty, Failure, Success } from './StatsCell'

describe('StatsCell', () => {
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
          {
            iso: 'itl',
            name: 'Italy',
            dailyCounts: [{ totalCases: 3 }, { totalCases: 4 }]
          },
          {
            iso: 'chn',
            name: 'China',
            dailyCounts: [{ totalCases: 3 }, { totalCases: 4 }]
          }
        ]
      })
    }).not.toThrow()
  })
})
