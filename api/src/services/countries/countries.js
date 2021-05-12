import { db } from 'src/lib/db'

export const countries = () =>
  db.country.findMany({
    include: {
      dailyCounts: {
        include: {
          date: true
        }
      }
    }
  })
