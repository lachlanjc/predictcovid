/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const countries = require('./countries')

dotenv.config()
const db = new PrismaClient()

/**
 *
 * @template T
 * @param {Array<T>} array
 * @param {(item: T) => void} callback
 * @returns Promise<void>
 */
async function asyncForEach(array, callback) {
  const promises = array.map((item) => callback(item))

  return Promise.allSettled(promises)
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
