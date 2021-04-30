'use strict'

const get            = require('lodash.get')
const jsonld         = require('jsonld')
const documentLoader = require('./documentLoader')

const ID_KEY     = [ '@id' ]
const ISSUER_KEY = [ 'https://www.w3.org/2018/credentials#issuer', '@id' ]
const HOLDER_KEY = [ 'https://www.w3.org/2018/credentials#holder', '@id' ]

const matchCredentials = async (inputs, credentials = [], holder = null) => {
  const result = {}

  const credentialsMap       = {}
  const credentialsCompacted = []

  for (const credential of credentials) {
    const { id }       = credential
    credentialsMap[id] = credential

    const compacted = await jsonld.compact(credential, {}, { documentLoader })
    credentialsCompacted.push(compacted)
  }

  const match = ({ issuer, path }) => {
    const matches = credentialsCompacted
      .filter(compacted => get(compacted, ISSUER_KEY) === issuer)
      .filter(compacted => !holder || get(compacted, HOLDER_KEY) === holder)
      .filter(compacted => !!get(compacted, path))

    const ids    = matches.map(compacted => get(compacted, ID_KEY))
    const values = matches.map(compacted => get(compacted, path))
    const credentials = ids.map(id => credentialsMap[id])

    return [ credentials, values ]
  }

  for (const key in inputs) {
    const spec    = inputs[key]
    const options = []

    for (const source of spec.sources) {
      const [ credentials, values ] = match(source)

      const hasMatchedCredentials = credentials.length > 0

      if (hasMatchedCredentials) {
        options.push({ source, credentials, values })
      }
    }

    const { isRequired } = spec

    result[key] = { isRequired, options }
  }

  return result
}

module.exports = matchCredentials
