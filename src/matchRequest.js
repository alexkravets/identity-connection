'use strict'

const verifyRequest    = require('./verifyRequest')
const matchCredentials = require('./matchCredentials')

const matchRequest = async (requestJwt, credentials = []) => {
  const [ , request ]  = await verifyRequest(requestJwt)
  const { inputsJson } = request

  const inputs = JSON.parse(inputsJson)

  return matchCredentials(inputs, credentials)
}

module.exports = matchRequest
