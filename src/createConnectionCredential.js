'use strict'

const requestManifestSchema         = require('./requestManifestSchema')
const { Schema, CredentialFactory } = require('@kravc/schema')

const connectionSchema = new Schema({
  id: {
    required: true
  },
  url: {
    format:   'url',
    required: true
  },
  iconUrl: {
    format:   'url',
    required: true
  },
  title: {
    required: true
  },
  subtitle: {
    required: true
  },
  category: {
    enum: [
      'Games',
      'Services',
      'Organizations'
    ],
    default:  'Service',
    example:  'Game',
    required: true
  },
  requestManifest: {
    $ref: 'RequestManifest'
  }
}, 'Connection')

const createConnectionCredential = (baseUrl, id, holder, connection = {}) => {
  const factory    = new CredentialFactory(`${baseUrl}ConnectionV1`, [ connectionSchema, requestManifestSchema ])
  const credential = factory.createCredential(id, holder, connection)

  return credential
}

module.exports = createConnectionCredential
