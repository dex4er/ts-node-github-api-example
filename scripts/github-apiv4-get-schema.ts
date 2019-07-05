#!/usr/bin/env ts-node

/// <reference types="node" />

import JSONstringify from "fast-safe-stringify"
import fs from "fs"
import fetch from "node-fetch"

const GITHUB_API_URL = "https://api.github.com/graphql"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const SCHEMA_JSON = "schema/json/schema.json"

async function main(): Promise<void> {
  const res = await fetch(GITHUB_API_URL, {
    headers: {Authorization: "bearer " + GITHUB_TOKEN},
  })
  const data = await res.json()
  fs.writeFileSync(SCHEMA_JSON, JSONstringify(data.data, undefined, 2))
  console.info({[SCHEMA_JSON]: {[GITHUB_API_URL]: res.statusText}})
}

void main().catch(console.error)
