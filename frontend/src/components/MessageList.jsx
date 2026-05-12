import { useEffect, useRef } from 'react';
import './MessageList.css';

function MessageList({ messages }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="messages-container" ref={containerRef}>
      {messages.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet. Be the first to say something!</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-header">
              <strong className="message-username">{msg.username}</strong>
              <span className="message-time">{formatTime(msg.timestamp)}</span>
            </div>
            <div className="message-text">{msg.message}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;
