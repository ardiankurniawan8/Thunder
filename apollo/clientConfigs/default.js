import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
  const httpLink = new HttpLink({ uri: 'http://128.199.145.173:8118/graphql' })

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    const token = ctx.store.state.authentication.token ? ctx.store.state.authentication.token : null

    operation.setContext({
      headers: { authorization: `Bearer ${token}` }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
