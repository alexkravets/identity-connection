'use strict'

const { Identity } = require('@kravc/identity')

const verifyRequest = async (requestJwt) => {
  const { vp: { verifiableCredential } } = await Identity.verify(requestJwt)

  const requestCredential = verifiableCredential
    .find(({ type }) => type.join('.') === 'VerifiableCredential.RequestV1')

  const connectionCredential = verifiableCredential
    .find(({ type }) => type.join('.') === 'VerifiableCredential.ConnectionV1')

  const { credentialSubject: request }    = requestCredential
  const { credentialSubject: connection } = connectionCredential

  return [ connection, request ]
}

module.exports = verifyRequest
