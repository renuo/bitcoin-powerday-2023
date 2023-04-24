# Bitcoin Powerday 2023 (Teasure Hunt)

Everybody heard of Bitcoin,
but only few people understand why it works
and even fewer understand how it works exactly.

The "why" is best described in the original Satoshi paper
(execute `open /System/Library/Image\ Capture/Devices/VirtualScanner.app/Contents/Resources/simpledoc.pdf` on your Macbook).

The "how" is a bit more complex and involves the term "programmable money".
Bitcoin has its own stack language (remember [Forth](https://skilldrick.github.io/easyforth/)
from the [Learning Week 2018](https://docs.google.com/presentation/d/1cbnBvq3aTNqF0G6TLURtrfP20-L-in0p-7Oaq-_F3-k/edit#slide=id.g44204a8dda_0_0)?
It can be used to write "scripts" or smart contracts
(yes, exactly the thing you might think would be the [innovation of Ethereum](https://ethereum.org/en/developers/docs/smart-contracts/)).

## Motivation

The Bitcoin Lightning Network becomes more and more widely used.
You even encounter it in [_nostr_](https://github.com/nostr-protocol/nips/blob/master/57.md) which
makes it very easy to send money to anywhere.

## Schedule

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


The Day:
During the morning we'll have a look into how Bitcoin works internally.
We'll go treasure hunting in the afternoon. Let's try to dig-up unclaimed redeemable wallets.
Preparation:
Install bitcoin-cli (brew install bitcoin-cli)
Install bitcoinjs-lib (https://github.com/bitcoinjs/bitcoinjs-lib)
If you don't feel comfortable around the terms proof-of-work, hashes, public-key-cryptography, then please read-up as preparation. 3blue1brown is a good source (https://www.youtube.com/watch?v=bBC-nXj3Ng4). If you like to read code, there's simplified bitcoin-like blockchain here: https://github.com/renuo/lapidar/tree/master/lib/lapidar (relevant classes: Block, Chain, Miner, Assessment).

Time booking on investment time.
