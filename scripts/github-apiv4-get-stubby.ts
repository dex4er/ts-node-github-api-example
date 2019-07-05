#!/usr/bin/env ts-node

/// <reference types="node" />

import "cross-fetch/polyfill"

import {addTypenameToDocument} from "apollo-utilities"
import JSONstringify from "fast-safe-stringify"
import fs from "fs"
import {DocumentNode, OperationDefinitionNode, print} from "graphql"
import gql from "graphql-tag"
import yaml from "js-yaml"
import escapeRegExp from "lodash.escaperegexp"
import path from "path"
import shell from "shelljs"
import {StubbyData} from "stubby"
import {URL} from "url"

const STUBBY_YAML = "stubby.yml"
const STUBBY_DIR = "stubby"

const GITHUB_API_URL = process.env.GITHUB_API_URL || "https://api.github.com/graphql"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

async function main(): Promise<void> {
  const stubbyData: StubbyData[] = []

  for (const graphqlFilename of shell.ls("operations/*.graphql")) {
    const basename = path.basename(graphqlFilename, ".graphql")
    const graphqlNode: DocumentNode = gql([fs.readFileSync(graphqlFilename).toString()])
    const graphqlOperationName = graphqlNode.definitions
      .filter(
        (d): d is OperationDefinitionNode => d && d.kind === "OperationDefinition",
      )
      .map(d => d.name)
      .filter(n => n && n.kind === "Name")
      .map(n => n!.value)[0]
    const query = print(addTypenameToDocument(graphqlNode))
    const body = JSONstringify({query})
    const url = new URL(GITHUB_API_URL)
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (GITHUB_TOKEN) {
      headers.Authorization = `Token ${GITHUB_TOKEN}`
    }
    const response = await fetch(url.toString(), {
      method: "POST",
      headers,
      body,
    })
    if (!response.ok) {
      throw new Error(`${url} is not ok: ${response.status} ${response.statusText}`)
    }
    const json = await response.json()
    const output = JSONstringify(json, undefined, 2) + "\n"
    const jsonFilename = `${STUBBY_DIR}/${basename}.json`
    fs.writeFileSync(jsonFilename, output)
    console.info(`Generated ${jsonFilename} file.`)

    stubbyData.push({
      request: {
        url: `^${escapeRegExp(url.pathname)}$`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        json: `{"operationName":"${graphqlOperationName}"}`,
      },
      response: {
        headers: {
          "content-type": "application/json",
        },
        file: `${STUBBY_DIR}/${basename}.json`,
      },
    })
  }

  fs.writeFileSync(STUBBY_YAML, yaml.safeDump(stubbyData))
  console.info(`Generated ${STUBBY_YAML} file.`)
}

void main().catch(console.error)
