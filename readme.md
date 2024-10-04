# Secure Blog App

This is a secure blog application built with **Node.js**, **Express**, and **SQLite3**. It allows users to post and view blog entries. Posts can only be made by authorized clients using an API key.

## Features
- **Create Blog Posts**: Only clients with a valid API key can create new posts.
- **View Blog Posts**: All blog posts are displayed in reverse chronological order on the main page.
- **SQLite3 Database**: Lightweight and fast local database.

## Requirements
- **Node.js**: Make sure you have Node.js installed on your system.
- **SQLite3**: SQLite3 should be installed (most systems come with SQLite3 pre-installed).

## Installation
1. **Clone the repository or extract the zip file**.
2. **Navigate to the project directory**:
   ```bash
   cd blog-app
   ```
3. **Install dependencies** using npm:
   ```bash
   npm install
   ```

## Environment Setup
1. Create a `.env` file in the root of your project with the following content:
   ```
   API_KEY=your-secure-api-key-here
   ```

## Running the Application
To start the server:
```bash
npm start
```

By default, the application will run on port `3000`. You can access the blog at `http://localhost:3000`.

## API Routes
- **GET /api/posts**: Fetches all blog posts.
- **POST /api/posts**: Creates a new blog post (requires `title`, `content`, and a valid `API_KEY`).

## License
This project is licensed under the ISC License.
