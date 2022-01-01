'use strict'

const crypto       = require('crypto')
const { Identity } = require('@kravc/identity')

const generateSeed = () => {
  const identity = Identity.generate(crypto.randomBytes)
  return identity.privateKey
}

module.exports = generateSeed
