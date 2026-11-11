# Tip Me on BOT Chain

Tip Me lets supporters send direct, native-BOT tips to creators on BOT Chain Mainnet.

## BOT Chain Mainnet

- Chain ID: `677` (`0x2a5`)
- RPC: `https://rpc.botchain.ai`
- Explorer: `https://scan.botchain.ai`
- Native token: BOT, 18 decimals

The `DirectCreatorSupport` contract transfers `msg.value` directly to the creator. Tips and gas are paid in BOT; this is not an ERC-20 USDC transfer.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

The BOT Mainnet deployment is `0x3636B7955805ee9af9A974fa883EC39F10701E9D`. Set `VITE_DIRECT_CREATOR_SUPPORT_ADDRESS` in `.env` to use another deployment.

When a wallet does not know BOT Mainnet, the app requests that it add the network and then switches to chain ID `677`.

## Contract

`contracts/DirectCreatorSupport.sol` provides direct native-BOT tips to any creator address. The current deployment is [0x3636B7955805ee9af9A974fa883EC39F10701E9D](https://scan.botchain.ai/address/0x3636B7955805ee9af9A974fa883EC39F10701E9D).

## Commands

```bash
npm run lint
npm run build
```
