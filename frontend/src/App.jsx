import { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import UsernameModal from './components/UsernameModal';

// Use relative URL if VITE_API_URL not set, allowing proxy/same-origin access
const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('chitchat_username') || '');
  const [messages, setMessages] = useState([
    { username: 'System', message: 'hi', timestamp: Date.now() - 10000 },
    { username: 'System', message: 'hello', timestamp: Date.now() - 5000 },
    { username: 'System', message: 'how are you', timestamp: Date.now() - 2000 }
  ]);

  const handleSetUsername = (name) => {
    localStorage.setItem('chitchat_username', name);
    setUsername(name);
  };

  const loadMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages`);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (message) => {
    // Add message locally first for instant feedback
    const newMessage = {
      username: username,
      message: message,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);

    // Try to send to backend (silent fail is OK)
    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message })
      });

      if (response.ok) {
        loadMessages();
      }
    } catch (error) {
      console.error('Backend unavailable:', error);
    }
  };

  useEffect(() => {
    if (username) {
      loadMessages();
      const interval = setInterval(loadMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [username]);

  return (
    <div className="app">
      {!username ? (
        <UsernameModal onSetUsername={handleSetUsername} />
      ) : (
        <Chat
          username={username}
          messages={messages}
          onSendMessage={sendMessage}
        />
      )}
    </div>
  );
}

export default App;
