# ts-node-github-api-example

<!-- markdownlint-disable MD013 -->

[![Build Status](https://secure.travis-ci.org/dex4er/ts-node-github-api-example.svg)](http://travis-ci.org/dex4er/ts-node-github-api-example)

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
npm run get-schema
```

### typings

```shell
npm run graphql-codegen
```

### run

```shell
npm run viewer-query
```

## License

Copyright (c) 2019 Piotr Roszatycki <piotr.roszatycki@gmail.com>

[MIT](https://opensource.org/licenses/MIT)
