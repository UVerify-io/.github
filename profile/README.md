# 💎 Welcome to UVerify: Blockchain Made Easy

UVerify opens up blockchain technology to everyone, no matter your background. Effortlessly secure your file or text hashes on the Cardano blockchain. Want to kick the tires before diving into the code? Head over to [app.uverify.io](app.uverify.io) to check out the app.

## 🚀 Getting Started

It's all about verification, so why not run your own UVerify instance? Just grab this [docker-compose file](../scripts/docker-compose.yml) and fire off these commands:

```zsh
docker-compose up
```

### 🍓 Quick Wins

UVerify lets you build use cases in a snap. For most things, it feels more like calling an API than wrestling with a full-blown blockchain solution. Here are a few examples of what you can do with UVerify:

- **Notary Service:** Store file or text hashes on the Cardano blockchain.
```js
// UVerify plays nicely with any Cardano off-chain library. This example uses [meshjs.dev](https://meshjs.dev/apis/wallets)

// npm install @meshsdk/core

import { MeshWallet, KoiosProvider } from '@meshsdk/core';

const mnemonic = MeshWallet.brew();
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

// backendUrl is for example api.uverify.io or localhost:9090

const response = await axios.post(
backendUrl + '/api/v1/transaction/build',
{
    type: 'DEFAULT',
    address: userAddress,
    certificates: [
    {
        hash: hash,
        metadata: metadata,
        algorithm: 'SHA-256',
    },
    ],
}
);

if (response.status === 200 && response.data.status?.code === 'SUCCESS') {
    const tx = response.data.unsigned_transaction;
    const signedTx = await wallet.signTx(tx, true);
    const result = await axios.post(
        backendUrl + '/api/v1/transaction/submit',
        {
            transaction: signedTx
        }
    );

    if (result.status === 200 && result.data.successful) {
        console.log('Transaction submitted successfully with txHash:', result.data.value);
    }

    /*
        You can also use a CIP30 browser api to sign the transaction. In this case, signTx would return a witnessSet instead of a signed transaction. You can then just submit the unsigned transaction and the witnessSet to the backend.

        const api = await (window as any).cardano[enabledWallet].enable();
        const witnessSet = await api.signTx(tx, true);

        const result = await axios.post(
          backendUrl + '/api/v1/transaction/submit',
          {
            transaction: tx,
            witnessSet: witnessSet,
          }
        );
    */
}
```

- **Custom UI Templates:** Make it your own with a tailored look and feel.

Use the `uverify_template_id` field to tweak the certificate's appearance. You can also chip in by adding new templates, or keep templates exclusive to your users by implementing the [abstract template](https://github.com/UVerify-io/uverify-ui/blob/main/src/templates/Template.tsx)

Here's a basic example for [student certificates](https://github.com/UVerify-io/uverify-ui/blob/main/src/templates/Diploma.tsx). For something more involved, check out the [social hub ui template](https://github.com/UVerify-io/uverify-ui/blob/main/src/templates/SocialHub/SocialHubTemplate.tsx).

### 🔎 Dig Deeper

You can find all the details about UVerify at [docs.uverify.io](https://docs.uverify.io). It's got everything you need to get going, including API documentation, guides, and more.