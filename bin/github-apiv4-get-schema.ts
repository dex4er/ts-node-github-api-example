#!/usr/bin/env ts-node

/// <reference types="node" />

import fs from 'fs'
import fetch from 'node-fetch'

const GITHUB_API_URL = 'https://api.github.com/graphql'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const SCHEMA_JSON = 'schema/index.json'

fetch(GITHUB_API_URL, {headers: {Authorization: 'bearer ' + GITHUB_TOKEN}})
  .then(res => {
    const schemaFile = fs.createWriteStream(SCHEMA_JSON)
    res.body.pipe(schemaFile)
    console.info({[SCHEMA_JSON]: {[GITHUB_API_URL]: res.statusText}})
  })
  .catch(console.error)
