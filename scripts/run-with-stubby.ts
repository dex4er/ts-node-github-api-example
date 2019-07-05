#!/usr/bin/env ts-node

import fs from "fs"
import yaml from "js-yaml"
import path from "path"
import {Stubby, StubbyData} from "stubby"
import {URL} from "url"
import which from "which"

const STUBBY_YAML = "stubby.yml"

const GITHUB_API_URL = process.env.GITHUB_API_URL || "https://api.github.com/graphql"

const stubbyYaml = fs.readFileSync(path.join(__dirname, "..", STUBBY_YAML)).toString()
const data = yaml.safeLoad(stubbyYaml) as StubbyData

const script = process.argv[2]

if (!script) {
  console.error(`Usage: scripts/run-with-stubby.ts script`)
  process.exit(1)
}

if ((process.env.PATH || "").indexOf(__dirname + ":") === -1) {
  process.env.PATH = path.join(__dirname, "..") + ":" + process.env.PATH
}

const scriptPath = path.isAbsolute(script)
  ? script
  : which.sync(script, {nothrow: true}) || script
const modulePath = path.isAbsolute(scriptPath)
  ? scriptPath
  : path.join("..", scriptPath)

const stubby = new Stubby()

stubby.start({data, datadir: path.join(__dirname, "..")}, err => {
  if (err) {
    throw err
  }

  stubby.adminPortal.unref()
  stubby.tlsPortal.unref()
  stubby.stubsPortal.unref()

  stubby.stubsPortal.on("listening", () => {
    const addressInfo = stubby.stubsPortal.address()
    if (addressInfo === null || typeof addressInfo !== "object") {
      throw new Error("Unknown port number: " + addressInfo)
    }
    const {address, port} = addressInfo
    const url = new URL(GITHUB_API_URL)
    url.protocol = "http:"
    url.hostname = address
    url.port = String(port)

    process.env.GITHUB_API_URL = url.toString()
    delete process.env.GITHUB_TOKEN

    process.argv.splice(1, 1)

    require(modulePath)
  })
})
