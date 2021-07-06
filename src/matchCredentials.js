'use strict'

const get            = require('lodash.get')
const jsonld         = require('jsonld')
const documentLoader = require('./documentLoader')

const ID_KEY       = [ '@id' ]
const ISSUER_KEY   = [ 'https://www.w3.org/2018/credentials#issuer', '@id' ]
const HOLDER_KEY   = [ 'https://www.w3.org/2018/credentials#holder', '@id' ]
const SUBJECT_PATH = [ 'https://www.w3.org/2018/credentials#credentialSubject' ]

const matchCredentials = async (inputs, credentials = [], holder = null) => {
  const result = []

  const credentialsMap       = {}
  const credentialsCompacted = []

  for (const credential of credentials) {
    const { id }       = credential
    credentialsMap[id] = credential

    const compacted = await jsonld.compact(credential, {}, { documentLoader })
    credentialsCompacted.push(compacted)
  }

  const match = (path, issuer) => {
    const matches = credentialsCompacted
      .filter(compacted => get(compacted, ISSUER_KEY) === issuer)
      .filter(compacted => !holder || get(compacted, HOLDER_KEY) === holder)
      .filter(compacted => !!get(compacted, [ SUBJECT_PATH, path ]))

    const ids    = matches.map(compacted => get(compacted, ID_KEY))
    const values = matches.map(compacted => get(compacted, [ SUBJECT_PATH, path ]))
    const credentials = ids.map(id => credentialsMap[id])

    return [ credentials, values ]
  }

  for (const input of inputs) {
    const { path, issuer } = input

    const [ credentials, values ] = match(path, issuer)

    const hasMatchedCredentials = credentials.length > 0

    if (!hasMatchedCredentials) {
      continue
    }

    result.push({ ...input, values, credentials })
  }

  return result
}

module.exports = matchCredentials
