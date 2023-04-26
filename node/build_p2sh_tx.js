// Using https://bitcoinjs-guide.bitcoin-studio.com/bitcoinjs-guide/v5/part-three-pay-to-script-hash/puzzles/algebra_puzzle_p2sh.html
const {ECPairFactory} = require('ecpair');
const ecc = require('tiny-secp256k1');
const bitcoin = require('bitcoinjs-lib')
const ECPair = ECPairFactory(ecc);

const network = bitcoin.networks.bitcoin

//const redeemScript = bitcoin.script.fromASM(
//`
//  OP_3
//  OP_ADD
//  OP_5
//  OP_EQUAL
//`.trim().replace(/\s+/g, ' '));
//const redeemScript = bitcoin.script.compile([
//  bitcoin.opcodes.OP_3,
//  bitcoin.opcodes.OP_ADD,
//  bitcoin.opcodes.OP_5,
//  bitcoin.opcodes.OP_EQUAL
//])
const redeemScript = bitcoin.script.compile([
  bitcoin.opcodes.OP_1,
])

console.log('redeemScript  ', redeemScript.toString('hex'))

// Funding UTXO:
const p2sh = bitcoin.payments.p2sh({redeem: {output: redeemScript, network}, network})
console.log('p2sh.address  ', p2sh.address)

//return // Only search for outputs now

// Funding transaction details (TODO: fill out for hack)
const TX_ID = '55fa0228a484c4802cc38619421aae65b1c21d38492dc85a392ef51dd1c7e67a'
const TX_VOUT = 0
const TX_HEX = '0200000000010140cc478e540ad8a885e4446223100c7ffdfa14a72f24ce437276f666e27e25110000000017160014771e52bd6dd52adf7c9e17d311dca732e4e963edfeffffff01220200000000000017a914da1745e9b549bd0bfa1a569971c77eba30cd5a4b8702473044022037e7e0ba1f4a714bb57fa06a41cf3628a19c5ec83b64bc5dfcf90420b9c8283702207db20acb1336070f1d7d21005aa5b089dcb2deecfbc70d01351f57cf8b5fb069012102e1d8f6b0f05123ac1e7b7533911cd48135c6e0838db660f3ac4ba4ab5cb70353a6f40b00'

// Prepare target address
const alice = ECPair.makeRandom({ network: network })
const aliceWif = alice.toWIF()
const alicePayment = bitcoin.payments.p2pkh({ pubkey: alice.publicKey })
console.log('private WIF   ', aliceWif)
console.log('address       ', alicePayment.address)

// Spending Transaction
const psbt = new bitcoin.Psbt({network})
  .addInput({
    hash: TX_ID,
    index: TX_VOUT,
    nonWitnessUtxo: Buffer.from(TX_HEX, 'hex'),
    redeemScript: Buffer.from(redeemScript, 'hex')
  }) 
  .addOutput({
    address: alicePayment.address,
    value: 100, // satoshi
  })

const getFinalScripts = (inputIndex, input, script) => {
  // Step 1: Check to make sure the meaningful locking script matches what you expect.
  const decompiled = bitcoin.script.decompile(script)
  if (!decompiled) {
    throw new Error(`Can not finalize input #${inputIndex}`)
  }

  // Step 2: Create final scripts
  const payment = bitcoin.payments.p2sh({
    redeem: {
      output: script,
      input: bitcoin.script.compile([
        bitcoin.opcodes.OP_1,
      ]),
    },
  })

	console.log(payment.input)
  return {
    finalScriptSig: payment.input
  }
}

psbt.finalizeInput(0, getFinalScripts)

console.log('Transaction hexadecimal:')
console.log(psbt.extractTransaction().toHex())
