export const handler = (event, context, callback) => {
  return callback(null, { status: 200, body: 'Scrape, scrape, scrape!' })
}
