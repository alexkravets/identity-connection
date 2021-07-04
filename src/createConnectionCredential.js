'use strict'

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
      'Game',
      'Person',
      'Service',
      'Organization'
    ],
    default:  'Service',
    example:  'Game',
    required: true
  }
}, 'Connection')

const createConnectionCredential = (baseUrl, id, holder, connection = {}) => {
  const factory    = new CredentialFactory(`${baseUrl}ConnectionV1`, [ connectionSchema ])
  const credential = factory.createCredential(id, holder, connection)

  return credential
}

module.exports = createConnectionCredential
