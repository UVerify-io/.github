# 💎 Welcome to UVerify: Blockchain Made Easy

<p align="center">
  <a href="https://github.com/UVerify-io/.github/actions/workflows/test.yml">
    <img src="https://github.com/UVerify-io/.github/actions/workflows/test.yml/badge.svg" alt="Hourly UVerify Liveness Test" />
  </a>
   <a href="https://conventionalcommits.org">
    <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white" alt="Conventional Commits">
  </a>
   <a href="https://discord.gg/Dvqkynn6xc">
    <img src="https://img.shields.io/discord/1263737876743589938" alt="Join our Discord">
  </a>
</p>

UVerify opens up blockchain technology to everyone, no matter your background. Effortlessly secure your file or text hashes on the Cardano blockchain. Want to kick the tires before diving into the code? Head over to [app.uverify.io](app.uverify.io) to check out the app.

## ✨ Features

With UVerify, you can easily store and retrieve data on the Cardano blockchain. The API is straightforward, and the UI is both intuitive and highly customizable. You can deploy your own instance or use the hosted version — whatever fits your needs best. Our main goal is flexibility: UVerify is designed to be a tool anyone can integrate seamlessly into their own projects. It’s more than just a tool; it’s a platform.

### How does it work?

UVerify includes its own scoped chain indexer, a Web3 API key management system, on-chain metadata support, and extension points for both the backend and frontend. The frontend is built with React, while the backend is a Java Spring Boot application that leverages [Yaci Store](https://github.com/bloxbean/yaci-store).

## 🚀 Getting Started

It's all about verification, so why not run your own UVerify instance? Just grab this [docker-compose file](../scripts/docker-compose.yml) and fire off this command:

```zsh
docker compose up
```

### 🍓 Low Hanging Fruits

UVerify lets you build use cases in a snap. For most things, it feels more like calling an API than wrestling with a full-blown blockchain solution. Here are a few examples of what you can do with UVerify:

- **Notary Service:** Store file or text hashes on the Cardano blockchain.

Install the required dependencies:
```bash
npm install @meshsdk/core js-sha256 axios
```

**Node.js (server-side) example:**
```js
// UVerify plays nicely with any Cardano off-chain library.
// This example uses meshjs.dev

import { MeshWallet, KoiosProvider } from '@meshsdk/core';
import { sha256 } from 'js-sha256';
import axios from 'axios';

const BACKEND_URL = 'https://api.uverify.io'; // or 'http://localhost:9090' for local dev

// Generate a new wallet and store your mnemonic somewhere safe!
// If you lose it, you lose access to any funds held by this wallet.
const mnemonic = MeshWallet.brew();
console.log('Save your mnemonic:', mnemonic);

const koiosProvider = new KoiosProvider('api');
const wallet = new MeshWallet({
    networkId: 1, // 0: testnet, 1: mainnet
    fetcher: koiosProvider,
    submitter: koiosProvider,
    key: {
        type: 'mnemonic',
        words: mnemonic,
    },
});

const userAddress = await wallet.getChangeAddress();

// Hash the data you want to certify. This could be a string, file contents, etc.
const myData = 'Hello, UVerify!'; // replace with your content
const hash = sha256(myData);

// Optionally attach public metadata to the certificate
const metadata = {
    issuer: 'Acme Corp',
    description: 'Proof of existence for myData',
    date: new Date().toISOString(),
};

// Step 1: Build the unsigned transaction
// Make sure your wallet has funds before submitting a transaction.
// If you're on testnet, you can get free test ADA from the [Cardano Testnet Faucet](https://docs.cardano.org/cardano-testnets/tools/faucet/).
// If you're on mainnet, you'll need real ADA in your wallet. Your request will fail if the wallet balance is too low to cover the transaction fee.

const buildResponse = await axios.post(`${BACKEND_URL}/api/v1/transaction/build`, {
    type: 'DEFAULT',
    address: userAddress,
    certificates: [
        {
            hash,
            metadata,
            algorithm: 'SHA-256',
        },
    ],
});

if (buildResponse.status !== 200 || buildResponse.data.status?.code !== 'SUCCESS') {
    throw new Error('Failed to build transaction: ' + JSON.stringify(buildResponse.data));
}

// Step 2: Sign the transaction
const unsignedTx = buildResponse.data.unsigned_transaction;
const signedTx = await wallet.signTx(unsignedTx, true);

// Step 3: Submit the signed transaction
const submitResponse = await axios.post(`${BACKEND_URL}/api/v1/transaction/submit`, {
    transaction: signedTx,
});

if (submitResponse.status === 200 && submitResponse.data.successful) {
    console.log('Transaction submitted! TxHash:', submitResponse.data.value);
} else {
    throw new Error('Failed to submit transaction: ' + JSON.stringify(submitResponse.data));
}
```

**Browser (CIP-30 wallet) example:**

If you're building a frontend and want users to sign with their own wallet (e.g. Eternl, Yoroi), use the CIP-30 API instead:
```js
const api = await window.cardano[enabledWallet].enable();
const userAddress = (await api.getUsedAddresses())[0];

// Build the transaction the same way as above...
const buildResponse = await axios.post(`${BACKEND_URL}/api/v1/transaction/build`, {
    type: 'DEFAULT',
    address: userAddress,
    certificates: [{ hash, metadata, algorithm: 'SHA-256' }],
});

const unsignedTx = buildResponse.data.unsigned_transaction;

// The user signs via their browser wallet — returns a witness set, not a full signed tx
const witnessSet = await api.signTx(unsignedTx, true);

const submitResponse = await axios.post(`${BACKEND_URL}/api/v1/transaction/submit`, {
    transaction: unsignedTx,
    witnessSet,
});

if (submitResponse.status === 200 && submitResponse.data.successful) {
    console.log('Transaction submitted! TxHash:', submitResponse.data.value);
}
```

### **Custom UI Templates:** Make it your own with a tailored look and feel.

  Pass `uverify_template_id` in your certificate's metadata to control how it renders in the UI:
```js
  const metadata = {
      uverify_template_id: 'diploma',
      issuer: 'Acme University',
      recipient: 'Jane Doe',
  };
```

  There are two ways to work with templates:

  - **Use or contribute a community template**: Browse existing templates or add your own by implementing the [abstract template](https://github.com/UVerify-io/uverify-ui/blob/main/src/templates/Template.tsx). Contributions are welcome.
  - **Keep a template private**: If you're building a product on top of UVerify, you can implement the same abstract template in your own fork or deployment, keeping your branding exclusive to your users.

  To get a feel for what's possible, the [Diploma template](https://github.com/UVerify-io/uverify-ui/blob/main/src/templates/Diploma.tsx) is a clean starting point showing a simple single-purpose certificate layout. The [Social Hub template](https://github.com/UVerify-io/uverify-ui/blob/main/src/templates/SocialHub/SocialHubTemplate.tsx) goes further, demonstrating how to build a richer, multi-component layout when your certificate needs to display more complex data.

### 🔎 Dig Deeper

You can find all the details about UVerify at [docs.uverify.io](https://docs.uverify.io). It's got everything you need to get going, including API documentation, guides, and more.
