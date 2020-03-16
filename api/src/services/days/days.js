export const days = () => {
  return db.day.findMany({
    orderBy: { date: 'asc' }
  })
}
