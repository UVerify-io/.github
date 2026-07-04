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

UVerify opens up blockchain technology to everyone, no matter your background. Anchor file or text hashes on the Cardano blockchain, issue verifiable certificates, and build trust into any workflow — without deep blockchain expertise. Want to try it before diving into the code? Head over to [app.uverify.io](https://app.uverify.io).

## 🗂️ Key Repositories

| Repository | Description |
|---|---|
| [uverify-ui](https://github.com/UVerify-io/uverify-ui) | Main dApp — the React frontend at [app.uverify.io](https://app.uverify.io) |
| [uverify-backend](https://github.com/UVerify-io/uverify-backend) | Java Spring Boot API at [api.uverify.io](https://api.uverify.io) |
| [uverify-sdks](https://github.com/UVerify-io/uverify-sdks) | Official SDKs for TypeScript, Python, and Java |
| [uverify-examples](https://github.com/UVerify-io/uverify-examples) | Runnable end-to-end examples for all supported languages |
| [uverify-docs](https://github.com/UVerify-io/uverify-docs) | Documentation site at [docs.uverify.io](https://docs.uverify.io) |
| [uverify-ui-template](https://github.com/UVerify-io/uverify-ui-template) | CLI + core types for building custom certificate UI templates |
| [uverify-additional-templates](https://github.com/UVerify-io/uverify-additional-templates) | Community-contributed certificate UI templates |
| [uverify-discovery](https://github.com/UVerify-io/uverify-discovery) | Landing page at [uverify.io](https://uverify.io) |

📖 Full documentation at **[docs.uverify.io](https://docs.uverify.io)**

## ✨ Features

With UVerify you can store and retrieve data on the Cardano blockchain through a clean API and a customizable UI. Deploy your own instance or use the hosted version — whatever fits your needs. UVerify is designed to integrate into existing projects without requiring blockchain expertise. It is an open platform, not just a tool.

### How does it work?

UVerify includes its own scoped chain indexer, a Web3 API key management system, on-chain metadata support, and extension points for both the backend and frontend. The frontend is built with React, while the backend is a Java Spring Boot application that leverages [Yaci Store](https://github.com/bloxbean/yaci-store).

## 🚀 Getting Started

### Option A — Use the hosted app

The fastest way to explore UVerify is [app.uverify.io](https://app.uverify.io). No setup required. If you want to experiment without spending real ADA, use the preprod deployment at [app.preprod.uverify.io](https://app.preprod.uverify.io).

### Option B — Run your own instance

Grab the [docker-compose file](../scripts/docker-compose.yml) and fire off:

```zsh
docker compose up
```

### Option C — Run a local sandbox

The [uverify-examples](https://github.com/UVerify-io/uverify-examples) repository ships a full local devnet — UVerify UI, backend, chain indexer, and a Cardano devnet node — all in Docker:

```zsh
git clone https://github.com/UVerify-io/uverify-examples
cd uverify-examples
uv run sandbox.py start
```

The sandbox faucet funds wallets instantly, so you can run every example without spending real ADA or touching a testnet.

### Option D — Integrate via SDK

Install the SDK for your language and start issuing certificates in minutes:

```bash
# TypeScript / JavaScript
npm install @uverify/sdk

# Python
pip install uverify-sdk

# Java (Maven / Gradle)
# io.uverify:uverify-sdk
```

**Quick verify example (TypeScript):**

```ts
import { UVerifyClient } from '@uverify/sdk';

const client = new UVerifyClient();

// Check whether a hash has a certificate on-chain
const certificates = await client.verify('your-sha256-hex-hash');
console.log(certificates);
```

**Quick issue example (TypeScript):**

```ts
import { UVerifyClient } from '@uverify/sdk';
import { sha256 } from 'js-sha256';

const client = new UVerifyClient({
  signTx: (unsignedTx) => wallet.signTx(unsignedTx, true),
  signMessage: (msg) => wallet.signData(address, msg),
});

const hash = sha256('Hello, UVerify!');

const txHash = await client.issueCertificates(address, [
  {
    hash,
    algorithm: 'SHA-256',
    metadata: { issuer: 'Acme Corp', description: 'Proof of existence' },
  },
]);

console.log('Certificate anchored! TxHash:', txHash);
```

See the [SDK docs](https://docs.uverify.io/sdk) or the [uverify-examples](https://github.com/UVerify-io/uverify-examples) repository for complete runnable examples in TypeScript, Python, and Java, including diplomas, product passports, lab reports, and more.

## 🍓 Low Hanging Fruits

UVerify lets you build use cases in a snap. For most things, it feels more like calling an API than wrestling with a full-blown blockchain solution:

| Use Case | Description |
|---|---|
| [**Notary Service**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/notary) | Store file or text hashes on the Cardano blockchain |
| [**Diplomas & Credentials**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/diploma) | Batch-issue verifiable academic certificates |
| [**Digital Product Passports**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/digital_product_passport) | EU DPP-compliant product traceability on-chain |
| [**Lab Reports**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/laboratory_report) | GDPR-safe laboratory results with measured values |
| [**Certificates of Insurance**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/certificate_of_insurance) | Tamper-evident policy proof anchored on-chain |
| [**Lost-pet necklaces**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/pet_necklace) | Privacy-preserving owner data for pet identification |
| [**Document Integrity**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/document_integrity) | Tamper-evident anchoring of any document |
| [**Tokenizable Certificates**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/tokenizable_certificate) | Certificates that can be redeemed as on-chain NFTs |
| [**Agent Receipts**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/agent_receipt) | Immutable receipts for AI agent transactions with LCP-compliant terms |
| [**Identity Credentials**](https://github.com/UVerify-io/uverify-examples/tree/main/typescript/identity_credential) | KERI-backed credentials with on-chain issuance and revocation |
| **...and much more** | Browse all examples in [uverify-examples](https://github.com/UVerify-io/uverify-examples) |

### Custom UI Templates: Make it your own

Pass `uverify_template_id` in your certificate's metadata to control how it renders in the UI:

```js
const metadata = {
  uverify_template_id: 'diploma',
  issuer: 'Acme University',
  recipient: 'Jane Doe',
};
```

UVerify ships several built-in templates you can use today:

| Template ID | Use case |
|---|---|
| `diploma` | Academic certificates and credentials |
| `digitalProductPassport` | EU DPP product traceability |
| `laboratoryReport` | Lab results with measured values |
| `certificateOfInsurance` | Policy proof documents |
| `tokenizableCertificate` | Certificates redeemable as NFTs |
| `agentReceipt` | AI agent transaction receipts with LCP-compliant terms |
| `identityAuth` | KERI-backed identity credential issuance and revocation |
| `petNecklace` | Pet owner identification via QR necklace |
| `productVerification` | Product authenticity certificates |
| `documentIntegrity` | General-purpose tamper-evident documents |
| `monochrome` | Clean, minimal black-and-white layout |

There are two ways to add more:

**Use or contribute a community template** — Browse the [uverify-additional-templates](https://github.com/UVerify-io/uverify-additional-templates) repository or add your own by implementing the [abstract template](https://github.com/UVerify-io/uverify-ui/blob/main/src/templates/Template.tsx). Contributions are welcome.

**Build your own private template** — Use the [`uverify-ui-template`](https://github.com/UVerify-io/uverify-ui-template) CLI to scaffold a new template and keep your branding exclusive to your deployment:

```zsh
npx @uverify/cli init my-template
```

The [Diploma template](https://github.com/UVerify-io/uverify-ui/blob/main/src/templates/Diploma.tsx) is a clean starting point for single-purpose certificates.

## 🔎 Dig Deeper

| | |
|---|---|
| 📖 [docs.uverify.io](https://docs.uverify.io) | Full documentation, guides, and platform concepts |
| 🔌 [API Reference](https://api.uverify.io/v1/api-docs) | Interactive Swagger docs |
| 💬 [Discord](https://discord.gg/Dvqkynn6xc) | Get help and join the community |
| 🗺️ [Roadmap](https://github.com/orgs/UVerify-io/projects/1) | See what's coming next |
