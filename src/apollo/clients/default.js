import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, ApolloClient } from '@apollo/client'
import Observable from 'observable'

const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: performance.now() })
  return forward(operation)
})

const logTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    // data from a previous link
    const time = performance.now() - operation.getContext().start
    console.log(`operation ${operation.operationName} took ${time} to complete`)
    return data
  })
})

const ssrMiddleware = setContext((_, { headers }) => {
  if (process.client) return headers
  return {
    headers,
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

export default new ApolloClient({
  defaultHttpLink: false,
  cache: new InMemoryCache(),
  link: from([ssrMiddleware, timeStartLink, logTimeLink, httpLink]),
})
