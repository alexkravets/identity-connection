'use strict'

const { Identity } = require('@kravc/identity')

const verifyRequest = async (request, options = {}) => {
  const { vp: { holder, proof: { challenge } } } = await Identity.verify(request)
  const { url, method, inputs, connectionUrl }   = JSON.parse(challenge)

  let connection = null

  if (options.fetchConnection && connectionUrl) {
    const credential = await options.fetchConnection(connectionUrl)

    // TOOD: Figure out schema:
    // {
    //   '@type': 'https://portal.kra.vc/public/ConnectionV1#CredentialSubject',
    //   'https://portal.kra.vc/public/ConnectionV1#category': 'Games',
    //   'https://portal.kra.vc/public/ConnectionV1#iconUrl': 'https://portal.kra.vc/public/did-key-zQ3shsJH533KGK1fcBRdmsWrcz9UcJw4PEsybz1KP9JqpeVDx/icon.png',
    //   'https://portal.kra.vc/public/ConnectionV1#subtitle': 'Minesweeper logic board game',
    //   'https://portal.kra.vc/public/ConnectionV1#title': 'Mines - Classic Bomb Puzzle',
    //   'https://portal.kra.vc/public/ConnectionV1#url': 'https://apple.co/394ouT8'
    // }

    const { credentialSubject, holder: credentialHolder } = credential

    const isHolderMismatch = holder !== credentialHolder

    if (isHolderMismatch) {
      throw new Error('Connection credential holder mismatches request holder')
    }

    connection = credentialSubject
  }

  return {
    url,
    method,
    inputs,
    connection,
    connectionUrl
  }
}

module.exports = verifyRequest
