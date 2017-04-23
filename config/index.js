'use strict'

const existsDefault = require('existential-default-deep')
const existsFile = require('exists-file')
const path = require('path')
const {get} = require('lodash')

const defaultConfig = require('./default')

const env = get(process.env, 'NODE_ENV', 'development')
const envFile = path.resolve('config', env + '.js')

const config = existsFile.sync(envFile)
  ? existsDefault(require(envFile), defaultConfig) : defaultConfig

module.exports = config
