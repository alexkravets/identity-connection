'use strict'

const verifyRequest    = require('./verifyRequest')
const matchCredentials = require('./matchCredentials')

const matchRequest = async (request, credentials = []) => {
  const { inputs } = await verifyRequest(request)

  return matchCredentials(inputs, credentials)
}

module.exports = matchRequest
