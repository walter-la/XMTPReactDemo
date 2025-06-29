import { useState } from 'react'
import { Client } from '@xmtp/browser-sdk'
import { Wallet } from 'ethers'
import './App.css'

function App() {
  const [senderKey, setSenderKey] = useState('')
  const [receiverKey, setReceiverKey] = useState('')
  const [senderClient, setSenderClient] = useState(null)
  const [receiverClient, setReceiverClient] = useState(null)
  const [msgText, setMsgText] = useState('')
  const [messages, setMessages] = useState([])

  const initClients = async () => {
    if (!senderKey || !receiverKey) {
      alert('Please enter both private keys')
      return
    }
    const senderWallet = new Wallet(senderKey)
    const receiverWallet = new Wallet(receiverKey)
    const sClient = await Client.create(senderWallet)
    const rClient = await Client.create(receiverWallet)
    setSenderClient(sClient)
    setReceiverClient(rClient)
    const convo = await rClient.conversations.newConversation(sClient.address)
    const msgs = await convo.messages()
    setMessages(msgs.map(m => `${m.senderAddress}: ${m.content}`))
  }

  const sendMessage = async () => {
    if (!senderClient || !receiverClient) {
      alert('Initialize clients first')
      return
    }
    const convo = await senderClient.conversations.newConversation(receiverClient.address)
    await convo.send(msgText)
    setMsgText('')
    const receiverConvo = await receiverClient.conversations.newConversation(senderClient.address)
    const msgs = await receiverConvo.messages()
    setMessages(msgs.map(m => `${m.senderAddress}: ${m.content}`))
  }

  const refreshMessages = async () => {
    if (!senderClient || !receiverClient) {
      alert('Initialize clients first')
      return
    }
    const convo = await receiverClient.conversations.newConversation(senderClient.address)
    const msgs = await convo.messages()
    setMessages(msgs.map(m => `${m.senderAddress}: ${m.content}`))
  }

  return (
    <div id="root">
      <h1>XMTP Private Key Demo</h1>
      <div>
        <label>Sender Private Key:</label>
        <input type="text" value={senderKey} onChange={e => setSenderKey(e.target.value)} />
      </div>
      <div>
        <label>Receiver Private Key:</label>
        <input type="text" value={receiverKey} onChange={e => setReceiverKey(e.target.value)} />
      </div>
      <button onClick={initClients}>Initialize Signers</button>
      <div className="messaging">
        <input type="text" value={msgText} onChange={e => setMsgText(e.target.value)} placeholder="Message" />
        <button onClick={sendMessage}>Send</button>
        <button onClick={refreshMessages}>Refresh</button>
      </div>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
