import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'
import importAll from '@redwoodjs/api/importAll.macro'
import responseCachePlugin from 'apollo-server-plugin-response-cache'

const schemas = importAll('api', 'graphql')
const services = importAll('api', 'services')

export const handler = createGraphQLHandler({
  schema: makeMergedSchema({
    schemas,
    services: makeServices({ services }),
  }),
  cacheControl: {
    defaultMaxAge: 60 * 5, // 5 minutes
  },
  plugins: [
    responseCachePlugin({
      shouldReadFromCache: () => true,
      shouldWriteToCache: () => true,
    }),
  ],
})
