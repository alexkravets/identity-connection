'use strict'

const crypto       = require('crypto')
const { Identity } = require('@kravc/identity')

const generateSeed = () => {
  return crypto.randomBytes(Identity.SEED_LENGTH).toString('hex')
}

module.exports = generateSeed
