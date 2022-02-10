import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, ApolloClient } from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'js-sha256'

const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: performance.now() })
  return forward(operation)
})

const logTimeLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const time = performance.now() - operation.getContext().start
    const operationResponseTime = time
    response.data.timing = Math.round(operationResponseTime)
    response.data.date = new Date()
    console.log(
      'RESPO :: ',
      response,
      'operationResponseTime :: ',
      Math.round(operationResponseTime),
    )

    return response
  }),
)

const persistedQueriesLink = createPersistedQueryLink({ sha256 })

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

export default new ApolloClient({
  defaultHttpLink: false,
  cache: new InMemoryCache(),
  link: from([timeStartLink, persistedQueriesLink.concat(httpLink)]),
})
