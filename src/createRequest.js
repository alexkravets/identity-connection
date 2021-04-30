'use strict'

const createRequest = async (identity, url, {
  method = 'POST',
  inputs = {},
  connectionUrl = null
}) => {
  const payload   = { url, method, inputs, connectionUrl }
  const challenge = JSON.stringify(payload)

  const request = await identity.createPresentation([], {
    format: 'jwt',
    proofOptions: { challenge }
  })

  return request
}

module.exports = createRequest
