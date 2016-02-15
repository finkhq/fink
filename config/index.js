'use strict'

const existsFile = require('exists-file')
const path = require('path')
const existsDefault = require('existential-default')

const defaultConfig = require('./default')

const env = process.env.NODE_ENV ? process.env.NODE_ENV.toString() : 'development'
const envFile = path.resolve('config', env + '.js')

const config = existsFile(envFile) ? existsDefault(require(envFile), defaultConfig) : defaultConfig

module.exports = config
