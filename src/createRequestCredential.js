'use strict'

const { Schema, CredentialFactory } = require('@kravc/schema')

// TODO: Consider https://github.com/jwadhams/json-logic-js/ — for inputs
//       syntax.
const requestSchema = new Schema({
  id: {
    required: true
  },
  prompt: {
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
  // TODO: This should include suggested schema for inputs after figure out
  //       converting arrays to JSON-LD:
  inputsJson: {
    format:   'json',
    required: true
  }
  // inputs:
  //   required: true
  //   items:
  //     properties:
  //       key:
  //         format:   'slug'
  //         required: true
  //       path:
  //         required: true
  //       issuer:
  //         format:   'did'
  //         required: true
  //       isRequired:
  //         type:    boolean
  //         default: true
}, 'Request')

const createRequestCredential = (baseUrl, id, holder, request = {}) => {
  const factory    = new CredentialFactory(`${baseUrl}RequestV1`, [ requestSchema ])
  const credential = factory.createCredential(id, holder, request)

  return credential
}

module.exports = createRequestCredential
