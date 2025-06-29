# XMTP React Demo

This project demonstrates using [XMTP](https://xmtp.org/) with a simple React interface built with Vite. The demo relies on the `@xmtp/browser-sdk` and does **not** connect to a wallet. Instead you manually enter two private keys to create XMTP signers and exchange messages.

## Getting Started

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser. Enter two private keys—one for the sender and one for the receiver—then initialize the signers. You can send a message from the sender and refresh to see messages for the receiver.

**Warning:** do not use real wallet private keys. Generate test keys only.
