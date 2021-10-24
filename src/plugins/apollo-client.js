import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, ApolloClient } from '@apollo/client'
import Observable from 'observable'

export default (ctx) => {
  /*
  const metricsLink = new ApolloLink((operation, forward) => {
    console.log('THIS:: ', this)
    const { operationName } = operation
    const startTime = new Date().getTime()
    const observable = forward(operation)

    // Return a new observable so no other links can call .subscribe on the
    // the one that we were passsed.
    return new Observable((observer) => {
      observable.subscribe({
        complete: () => {
          const elapsed = new Date().getTime() - startTime
          console.warn(`[METRICS][${operationName}] (${elapsed}) complete`)
          observer.complete()
        },
        next: observer.next.bind(observer),
        error: (error) => {
          // ...
          observer.error(error)
        },
      })
    })
  })
*/
  const ssrMiddleware = setContext((_, { headers }) => {
    if (process.client) return headers
    return {
      headers,
    }
  })

  const httpLink = new HttpLink({
    uri: process.env.nuxtApiUrl,
  })

  const timeStartLink = new ApolloLink((operation, forward) => {
    operation.setContext({ start: new Date() })
    return forward(operation)
  })

  // console.log('process.env.nuxtApiUrl ', httpLink)

  // const link = from([ssrMiddleware, timeStartLink, httpLink])
  // const cache = new InMemoryCache()

  const client = new ApolloClient({
    defaultHttpLink: false,
    cache: new InMemoryCache(),
    link: from([ssrMiddleware, timeStartLink, httpLink]),
  })

  return client
  /*
  return {
    link,
    metricsLink,
    cache,
    defaultHttpLink: false,
  }
  */
}
