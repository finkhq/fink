'use strict'

const existsFile = require('exists-file')
const path = require('path')
const merge = require('lodash').merge

const defaultConfig = require('./default')
const env = process.env.NODE_ENV ? process.env.NODE_ENV.toString() : 'development'

const config = existsFile(path.resolve(env)) ? merge(defaultConfig, require(env)) : defaultConfig
module.exports = config
