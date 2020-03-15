export const countries = () => {
  return db.country.findMany()
}
