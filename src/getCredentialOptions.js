'use strict'

const verifyRequest    = require('./verifyRequest')
const matchCredentials = require('./matchCredentials')

const getCredentialOptions = async (requestJwt, credentials) => {
  const [ connection, _request ] = await verifyRequest(requestJwt)

  const { inputsJson } = _request
  const inputs  = JSON.parse(inputsJson)
  const options = await matchCredentials(inputs, credentials)

  const optionsMap = options.reduce((map, option) => {
    map[option.key] = map[option.key] ?
      [ ...map[option.key], ...option.credentials ] :
      [ ...option.credentials ]

    return map
  }, {})

  const credentialOptions = Object.keys(optionsMap).map(key => {
    return { key, credentials: optionsMap[key] }
  })

  const request = { ..._request, inputs }

  return [ connection, request, credentialOptions ]
}

module.exports = getCredentialOptions
