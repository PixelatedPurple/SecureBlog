const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static HTML from public directory

// Initialize SQLite3 Database
const db = new sqlite3.Database('./blog.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create table if it doesn't exist
db.run(\`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  )
\`);

// POST route to create a new blog post
app.post('/api/posts', (req, res) => {
  const { title, content, apiKey } = req.body;

  // Validate the API key
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Insert the new blog post into SQLite
  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.run(query, [title, content], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create post' });
    }
    res.status(201).json({ message: 'Post created successfully', postId: this.lastID });
  });
});

// GET route to retrieve all blog posts
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM posts ORDER BY date DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
    res.json(rows);
  });
});

// Serve frontend HTML (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));