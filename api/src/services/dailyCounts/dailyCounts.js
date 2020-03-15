export const dailyCounts = () => {
  return db.dailyCount.findMany()
}
