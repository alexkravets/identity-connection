'use strict'

const CREDENTIAL_SUBJECT_KEY = 'https://www.w3.org/2018/credentials#credentialSubject'

class Requirements {
  constructor(defaultCredentialsUrl = '') {
    this._inputs         = {}
    this._credentialsUrl = defaultCredentialsUrl
  }

  get inputs() {
    return this._inputs
  }

  addInput(key, isRequired = true) {
    const sources = []

    this._inputs[key] = { isRequired, sources }
  }

  addSource(key, issuer, path = []) {
    if (!key) {
      throw new Error('Parameter "key" is required')
    }

    if (!issuer) {
      throw new Error('Parameter "issuer" is required')
    }

    const input = this._inputs[key]

    if (!input) {
      throw new Error(`Key "${key}" is not defined`)
    }

    path = path.map(key => {
      const isUrl = key.startsWith('https://')

      if (isUrl) {
        return key
      }

      return `${this._credentialsUrl}${key}`
    })

    input.sources.push({
      issuer,
      path: [ CREDENTIAL_SUBJECT_KEY, ...path ]
    })
  }
}

module.exports = Requirements
