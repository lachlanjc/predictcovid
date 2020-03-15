export const days = () => {
  return db.day.findMany()
}
