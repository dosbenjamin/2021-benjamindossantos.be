import { ApolloClient, InMemoryCache } from '@apollo/client'

export default new ApolloClient({
  uri: 'https://benjamindossantos.herokuapp.com/graphql',
  cache: new InMemoryCache()
})
