export const countries = () =>
  db.country.findMany({
    include: { dailyCounts: true }
  })
