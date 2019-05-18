#!/usr/bin/env ts-node

import ApolloClient from 'apollo-client'

import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'
import {HttpLink} from 'apollo-link-http'
import {RetryLink} from 'apollo-link-retry'

import 'cross-fetch/polyfill'
import graphqlRegister from 'graphql-tag-loader-register'

graphqlRegister()

import viewerQuery from '../operations/viewer.graphql'

import {ViewerQuery, ViewerQueryVariables} from '../schema'

const GITHUB_API_URL = 'https://api.github.com/graphql'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const client = new ApolloClient({
  link: ApolloLink.from([
    new RetryLink({
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true,
      },
      attempts: {
        max: 5,
        retryIf: (error, _operation) => !!error,
      },
    }),
    setContext((_operation, {headers}) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    }),
    new HttpLink({
      uri: GITHUB_API_URL,
    }),
  ]),
  cache: new InMemoryCache(),
})

async function main(): Promise<void> {
  const viewerQueryVariables: ViewerQueryVariables = {
    pong: 'pong',
  }
  const result = await client.query<ViewerQuery, ViewerQueryVariables>({
    query: viewerQuery,
    variables: viewerQueryVariables,
  })
  console.info(result.data.viewer)
}

main().catch(console.error)
