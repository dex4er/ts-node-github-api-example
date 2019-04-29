#!/usr/bin/env ts-node

import fs from 'fs'
import fetch from 'node-fetch'

const GITHUB_API_URL = 'https://api.github.com/graphql'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const SCHEMA_JSON = 'schema.json'

fetch(GITHUB_API_URL, {headers: {Authorization: 'bearer ' + GITHUB_TOKEN}})
  .then(res => {
    const dest = fs.createWriteStream(SCHEMA_JSON)
    res.body.pipe(dest)
    console.info(res.statusText)
  })
  .catch(err => console.error(err))
