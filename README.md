# @dex4er/ts-node-github-api-example

<!-- markdownlint-disable MD013 -->

[![Travis CI](https://secure.travis-ci.org/dex4er/ts-node-github-api-example.svg)](http://travis-ci.org/dex4er/ts-node-github-api-example) [![GitLab Pipelines](https://gitlab.com/dex4er/ts-node-github-api-example/badges/develop/build.svg)](https://gitlab.com/dex4er/ts-node-github-api-example/pipelines)

<!-- markdownlint-enable MD013 -->

This is example of Github API v4 client written in Typescript with Apollo library.

## Requirements

This package requires ES6 with Node >= 8.

## Usage

In working directory:

### dependencies

```shell
npm install
```

### token

```shell
cp .env.example.sh .env
edit .env
```

### schema

```shell
yarn github-apiv4-get-schema
```

### typings

```shell
yarn graphql-codegen
```

### compile

```shell
yarn compile
```

### run

```shell
yarn github-apiv4-viewer-query
```

## License

Copyright (c) 2019 Piotr Roszatycki <piotr.roszatycki@gmail.com>

[MIT](https://opensource.org/licenses/MIT)
