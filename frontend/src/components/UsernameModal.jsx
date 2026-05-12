import { useState } from 'react';
import './UsernameModal.css';

function UsernameModal({ onSetUsername }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Please enter a name');
      return;
    }

    if (trimmedName.length > 20) {
      setError('Name must be 20 characters or less');
      return;
    }

    onSetUsername(trimmedName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>💬 Welcome to Chit-Chat!</h1>
        <p className="subtitle">Enter your name to join the conversation</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Your name"
            maxLength={20}
            autoFocus
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Join Chat</button>
        </form>
      </div>
    </div>
  );
}

export default UsernameModal;
