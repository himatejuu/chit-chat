import { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import UsernameModal from './components/UsernameModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('chitchat_username') || '');
  const [messages, setMessages] = useState([]);

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
      console.error('Error sending message:', error);
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
