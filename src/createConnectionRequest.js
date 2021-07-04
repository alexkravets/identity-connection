'use strict'

const createConnectionRequest = async (identity, connectionCredential, requestCredential) => {
  const credentials = [
    connectionCredential,
    requestCredential
  ]

  const requestJwt =
    await identity.createPresentation(credentials, { format: 'jwt' })

  return requestJwt
}

module.exports = createConnectionRequest
