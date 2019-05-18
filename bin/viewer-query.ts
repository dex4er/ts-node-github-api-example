#!/usr/bin/env ts-node

import ApolloClient from 'apollo-boost'
import 'cross-fetch/polyfill'
import graphqlRegister from 'graphql-tag-loader-register'

graphqlRegister()

import viewerQuery from '../operations/viewer.graphql'

import {ViewerQuery, ViewerQueryVariables} from '../schema'

const GITHUB_API_URL = 'https://api.github.com/graphql'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const client = new ApolloClient({
  uri: GITHUB_API_URL,
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: 'bearer ' + GITHUB_TOKEN,
      },
    })
  },
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
