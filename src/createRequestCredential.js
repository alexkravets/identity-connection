'use strict'

const { CredentialFactory } = require('@kravc/schema')
const requestManifestSchema = require('./requestManifestSchema')

const requestSchema = requestManifestSchema.extend({
  id: {
    required: true
  },
  callbackUrl: {
    format:   'url',
    required: true
  },
  callbackMethod: {
    enum: [
      'POST',
      'PATCH'
    ],
    default:  'PATCH',
    required: true
  },
}, 'Request')

const createRequestCredential = (baseUrl, id, holder, request = {}) => {
  const factory    = new CredentialFactory(`${baseUrl}RequestV1`, [ requestSchema ])
  const credential = factory.createCredential(id, holder, request)

  return credential
}

module.exports = createRequestCredential
