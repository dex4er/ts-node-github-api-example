import {DocumentNode} from 'graphql'
import gql from 'graphql-tag'

export const viewerQuery: DocumentNode = gql`
  query Viewer {
    viewer {
      login
      name
    }
  }
`
