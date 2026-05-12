import { useState, useEffect, useRef } from 'react';
import './Chat.css';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function Chat({ username, messages, onSendMessage }) {
  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>💬 Chit-Chat</h1>
        <p className="subtitle">Public Chat Room</p>
        <p className="username-display">Chatting as: <strong>{username}</strong></p>
      </header>

      <MessageList messages={messages} />

      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default Chat;
