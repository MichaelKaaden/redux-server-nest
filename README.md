# Redux Server (Nest.js Edition)

[![GitHub last commit](https://img.shields.io/github/last-commit/MichaelKaaden/redux-server-nest.svg)](https://github.com/MichaelKaaden/redux-server-nest/commits/master)
[![GitHub tag](https://img.shields.io/github/tag/MichaelKaaden/redux-server-nest.svg)](https://github.com/MichaelKaaden/redux-server-nest/releases)
[![GitHub version](https://img.shields.io/github/package-json/v/MichaelKaaden/redux-server-nest.svg)](https://github.com/MichaelKaaden/redux-server-nest/blob/master/package.json)
[![Build Status](https://travis-ci.org/MichaelKaaden/redux-server-nest.svg?branch=master)](https://travis-ci.org/MichaelKaaden/redux-server-nest)
[![dependencies](https://img.shields.io/david/MichaelKaaden/redux-server-nest.svg)](https://david-dm.org/MichaelKaaden/redux-server-nest)
[![devDependencies](https://img.shields.io/david/dev/MichaelKaaden/redux-server-nest.svg)](https://david-dm.org/MichaelKaaden/redux-server-nest?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/MichaelKaaden/redux-server-nest.svg)](https://github.com/MichaelKaaden/redux-server-nest/issues)
[![license](https://img.shields.io/github/license/MichaelKaaden/redux-server.svg)](https://github.com/MichaelKaaden/redux-server)

This is a tiny REST service managing counters. The counters
are kept in memory, so they are reset every time you restart
the service.

Each counter has
- a unique index (a number greater or equal 0) and
- a value.

You can either get or set a counter. But in any distributed
environment, the latter would be bad practice. Use this only
for setting values for presentation purposes. Usually, you
would use the increment and decrement operations instead.

You can either get or set a counter. Of course, you shouldn't
set any counter in a distributed environment. Instead, you
should get it and then use the increment or decrement operations
on it. For presentations, it is a reasonable choice to set
some counters before showing anything to your audience.

The RESTful Web Service runs at [http://localhost:3000](http://localhost:3000).
Its Swagger API is available at [http://localhost:3000/swagger-ui/](http://localhost:3000/swagger-ui/). 

The client side to this service resides in
[https://github.com/MichaelKaaden/redux-client-ngrx](https://github.com/MichaelKaaden/redux-client-ngrx).

## Description

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
