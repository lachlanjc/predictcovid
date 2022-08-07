import { db } from 'src/lib/db'

export const days = () => {
  return db.day.findMany({
    orderBy: { date: 'asc' }
  })
}
