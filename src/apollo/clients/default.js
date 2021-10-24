import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, ApolloClient } from '@apollo/client'

const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: performance.now() })
  return forward(operation)
})

const logTimeLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const time = performance.now() - operation.getContext().start
    const operationResponseTime = time
    response.data.timing = operationResponseTime
    console.log('RESPO:: ', response)
    return response
  }),
)

const ssrMiddleware = setContext((_, { headers }) => {
  if (process.client) return headers
  return {
    headers,
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const {
      response: { headers },
    } = context

    if (headers) {
      // headers.set({ 'x-foo': 'bar' })
    }

    return response
  })
})

const setHeaders = setContext((_request, { headers }) => ({
  headers: {
    ...headers,
    'x-my-custom-header': logTimeLink.operationResponseTime,
  },
}))

export default new ApolloClient({
  defaultHttpLink: false,
  cache: new InMemoryCache(),
  link: from([ssrMiddleware, logTimeLink, timeStartLink, httpLink]),
})
