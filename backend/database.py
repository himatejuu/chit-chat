import sqlite3
from datetime import datetime
import os

# Use local path for development, /var/lib/chat for production
DB_PATH = os.getenv("DB_PATH", "./chat.db")

def init_db():
    db_dir = os.path.dirname(DB_PATH)
    if db_dir:  # Only create directory if path includes a directory
        os.makedirs(db_dir, exist_ok=True)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()

def get_messages(limit=50):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('''
        SELECT username, message, timestamp
        FROM messages
        ORDER BY timestamp DESC
        LIMIT ?
    ''', (limit,))

    messages = [dict(row) for row in cursor.fetchall()]
    messages.reverse()  # Show oldest first

    conn.close()
    return messages

def add_message(username, message):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO messages (username, message)
        VALUES (?, ?)
    ''', (username, message))

    conn.commit()
    conn.close()
