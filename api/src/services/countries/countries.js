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
