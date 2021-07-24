'use strict'

const { Schema } = require('@kravc/schema')

const requestManifestSchema = new Schema({
  prompt: {
    required: true
  },
  // TODO: This should include suggested schema for inputs after figure out
  //       converting arrays to JSON-LD:
  // TODO: Consider https://github.com/jwadhams/json-logic-js/ — for inputs
  //       syntax.
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
}, 'RequestManifest')

module.exports = requestManifestSchema
