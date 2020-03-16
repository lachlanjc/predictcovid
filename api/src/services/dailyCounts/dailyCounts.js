export const dailyCounts = () => {
  return db.dailyCount.findMany({
    include: { country: true, date: true }
  })
}
