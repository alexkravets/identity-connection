'use strict'

const { Identity } = require('@kravc/identity')

// TODO: Check whether there is a need to add additional verifications:
const verifyRequest = async (requestJwt) => {
  const { vp: { verifiableCredential } } = await Identity.verify(requestJwt)

  const requestCredential = verifiableCredential
    .find(({ type }) => type.join('.') === 'VerifiableCredential.RequestV1')

  const connectionCredential = verifiableCredential
    .find(({ type }) => type.join('.') === 'VerifiableCredential.ConnectionV1')

  const { credentialSubject: _request }    = requestCredential
  const { credentialSubject: _connection } = connectionCredential

  const requestCredentialJson    = JSON.stringify(requestCredential)
  const connectionCredentialJson = JSON.stringify(connectionCredential)

  const request    = { ..._request, requestCredentialJson }
  const connection = { ..._connection, connectionCredentialJson }

  return [ connection, request ]
}

module.exports = verifyRequest
