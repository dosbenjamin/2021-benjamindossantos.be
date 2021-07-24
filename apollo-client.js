import { ApolloClient, InMemoryCache } from '@apollo/client'

export default new ApolloClient({
  uri: process.env.STRAPI_API,
  cache: new InMemoryCache()
})
