# @dex4er/ts-node-github-api-example

<!-- markdownlint-disable MD013 -->

[![Travis CI](https://secure.travis-ci.org/dex4er/ts-node-github-api-example.svg)](http://travis-ci.org/dex4er/ts-node-github-api-example) [![GitLab Pipelines](https://gitlab.com/dex4er/ts-node-github-api-example/badges/develop/build.svg)](https://gitlab.com/dex4er/ts-node-github-api-example/pipelines)

<!-- markdownlint-enable MD013 -->

This is an example of Github API v4 client written in Typescript with Apollo library.

Additionaly this project provides a Gitlab pipeline configuration which
produces binary packages stored in artifacts repository:
<https://gitlab.com/dex4er/ts-node-github-api-example-packages>

## Requirements

This package requires ES6 with Node >= 8.

## Usage

In working directory:

### dependencies

```shell
yarn
```

### token

```shell
cp .env.example.sh .env
edit .env
```

### schema offline

```shell
git submodule sync
git submodule update --init
# to download the latest later:
git submodule update --remote
```

### schema online

```shell
yarn github-apiv4-get-schema
```

### schema download for offline

```shell
yarn github-apiv4-get-stubby
```

### schema to typescript

```shell
yarn codegen
```

### compile

```shell
yarn compile
```

### run offline for testing

```shell
yarn github-apiv4-viewer-query:stubby
```

### run online

```shell
yarn github-apiv4-viewer-query
```

## License

Copyright (c) 2019 Piotr Roszatycki <piotr.roszatycki@gmail.com>

[MIT](https://opensource.org/licenses/MIT)
