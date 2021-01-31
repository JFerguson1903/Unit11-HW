// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// Basic route that sends the user to the landing page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Basic route that sends the user first to the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));