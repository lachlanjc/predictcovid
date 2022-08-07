import { db } from 'src/lib/db'

export const dailyCounts = () => {
  return db.dailyCount.findMany({
    include: { country: true, date: true }
  })
}
