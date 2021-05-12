/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

const countries = [
  {
    iso: 'itl',
    worldometersSlug: 'italy',
    name: 'Italy',
  },
  {
    iso: 'chn',
    worldometersSlug: 'china',
    name: 'China',
  },
  {
    iso: 'irn',
    worldometersSlug: 'iran',
    name: 'Iran',
  },
  {
    iso: 'kor',
    worldometersSlug: 'south-korea',
    name: 'South Korea',
  },
  {
    iso: 'esp',
    worldometersSlug: 'spain',
    name: 'Spain',
  },
  {
    iso: 'deu',
    worldometersSlug: 'germany',
    name: 'Germany',
  },
  {
    iso: 'fra',
    worldometersSlug: 'france',
    name: 'France',
  },
  {
    iso: 'usa',
    worldometersSlug: 'us',
    name: 'United States',
  },
  {
    iso: 'gbr',
    worldometersSlug: 'uk',
    name: 'United Kingdom',
  },
  // {
  //   iso: 'cad',
  //   worldometersSlug: 'canada',
  //   name: 'Canada',
  // },
  // {
  //   iso: 'ind',
  //   worldometersSlug: 'india',
  //   name: 'India',
  // },
  // {
  //   iso: 'bra',
  //   worldometersSlug: 'brazil',
  //   name: 'Brazil',
  // },
]

async function asyncForEach(array, callback) {
  const promises = array.map((item) => callback(item))

  return Promise.all(promises)
}

async function main() {
  await asyncForEach(countries, (country) => {
    console.log('adding', country.name)
    return db.country.create({ data: country })
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
