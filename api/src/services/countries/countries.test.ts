import {
  countries,
  country,
  createCountry,
  updateCountry,
  deleteCountry
} from './countries'

describe('countries', () => {
  scenario('returns all countries', async (scenario) => {
    const result = await countries()

    expect(result.length).toEqual(Object.keys(scenario.country).length)
  })

  scenario('returns a single country', async (scenario) => {
    const result = await country({ id: scenario.country.one.id })

    expect(result).toEqual(scenario.country.one)
  })

  scenario('creates a country', async (scenario) => {
    const result = await createCountry({
      input: {
        iso: 'String3505852',
        worldometersSlug: 'String8667951',
        name: 'String'
      }
    })

    expect(result.iso).toEqual('String3505852')
    expect(result.worldometersSlug).toEqual('String8667951')
    expect(result.name).toEqual('String')
  })

  scenario('updates a country', async (scenario) => {
    const original = await country({ id: scenario.country.one.id })
    const result = await updateCountry({
      id: original.id,
      input: { iso: 'String28432012' }
    })

    expect(result.iso).toEqual('String28432012')
  })

  scenario('deletes a country', async (scenario) => {
    const original = await deleteCountry({ id: scenario.country.one.id })
    const result = await country({ id: original.id })

    expect(result).toEqual(null)
  })
})
