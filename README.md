# Bitcoin Powerday 2023 (Teasure Hunt)

Everybody heard of Bitcoin,
but only few people understand why it works
and even fewer understand how it works exactly.

The "why" is best described in the original Satoshi paper
(execute `open /System/Library/Image\ Capture/Devices/VirtualScanner.app/Contents/Resources/simpledoc.pdf` on your Macbook).

The "how" is a bit more complex and involves the term "programmable money".
Bitcoin has its own stack language (remember [Forth](https://skilldrick.github.io/easyforth/)
from the [Learning Week 2018](https://docs.google.com/presentation/d/1cbnBvq3aTNqF0G6TLURtrfP20-L-in0p-7Oaq-_F3-k/edit#slide=id.g44204a8dda_0_0)?)
It can be used to write "scripts" or smart contracts
(yes, exactly the thing you might think would be the [innovation of Ethereum](https://ethereum.org/en/developers/docs/smart-contracts/)).
During the day we'll look at how this scripts work and we'll try to dig up some lost coins.

### Motivation

The Bitcoin Lightning Network becomes more widely used and
it becomes as easy and as cheap as never before to send money to humans or even machines.
Lightning "zaps" are for example part of [_nostr_](https://github.com/nostr-protocol/nips/blob/master/57.md)
where you can now use micro-cent transactions instead of "likes".
What Facebook wanted to do with [_Libra_](https://en.wikipedia.org/wiki/Diem_(digital_currency))
is basically already existing and working.

### Preparation

If you don't feel comfortable around the terms proof-of-work, hashes, public-key-cryptography,
then please read-up as preparation. _3blue1brown_ is a good source (https://www.youtube.com/watch?v=bBC-nXj3Ng4).
If you like to read code, there's simplified bitcoin-like blockchain here: https://github.com/renuo/lapidar/tree/master/lib/lapidar
(relevant classes: `Block`, `Chain`, `Miner`, `Assessment`).

## The Day

In the morning we'll try to understand how the shovel works.
In the afternoon we'll use it to dig.

|  Time | Matter                   | Duration |
| ----: | :----------------------- | -------: |
|  9:00 | Briefing                 |    30min |
|  9:30 | Playground               |    30min |
| 10:00 | FAQ                      |    30min |
| 10:30 | Diverge                  |       1h |
| 11:30 | Converge & Discuss       |       1h |
| 12:30 | Lunch                    |       1h |
| 13:30 | Dig                      |     2.5h |
| 16:00 | Collect results          |       1h |

### Our Full Node

We've got a potent root server today (12 CPUs, 128GB RAM, 3TB SSD)
on which runs a Bitcoin full synching node.
This means that all transactions ever made are on this server and
especially important is that all unspent transactions (UTXO) are in memory.

We share all the same user (root), so be responsible.

```
# SSH with Password on 1Password
ssh root@116.202.233.206

# Available commands
# - Bitcoin Daemon (running, please don't stop it).
#   This is the full node accepting and digesting transactions
# - Bitcoin CLI
#   It can be used to interact with the daemon.
ll ~/bin

# This is the main folder of the node. It holds the configuration and the blockchain.
ll ~/snap/bitcoin-core/common/.bitcoin

# You can see what's going on right now
tail -f ~/snap/bitcoin-core/common/.bitcoin/debug.log

# Let's see how far the blockain is synced
bitcoin-cli getblockchaininfo

# Let's have a look at the transaction mined for Amina
bitcoin-cli getrawtransaction 7b54b80435abf38ef91e479411c94b6b1dc0e7962cd4d870ec425658127c307b
```

For programming we don't use `bitcoin-cli` but JSON-RPC.

```
# Let's retrieve the first mined block ever by retrieving the hash first
bitcoin-cli getblockhash 0

# Then let's do a JSON-RPC call
result=$(curl --silent \
     --user renuo:powerday \
     --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f", 2]}' \
     -H 'content-type: text/plain;' \
     http://127.0.0.1:8332/)
echo $result

# The miner has left a message for us in the "coinbase" field
# Let's convert it from hex to ascii
echo $result | jq '.result.tx[0].vin[0].coinbase' | xxd -r -p && echo ''
```

**Attention:**
No connections from the outside are accepted.
If you want to, please setup an SSH tunnel.

This repository will be used to share code samples
and we'll summarize our findings here. Also it will be auto-deployed to
our Bitcoin full node.

## Legal

* Time bookings on investment time.
* Released under MIT license.
* Copyright at Renuo
