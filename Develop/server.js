// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = 3011;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// Route to local assets folder
app.use('/assets', express.static(__dirname + '/public/assets'))

// 204 content code for Favicon as to not cause a 404 error in cosole log
app.get('/favicon.ico', (req, res) => res.status(204));

// Basic route that sends the user to the landing page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Basic route that sends the user first to the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));

// Displays all notes
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'db', 'db.json')));

// Saving Newly Written Note
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    let newNote = req.body;
});

// Sets default route to be landing page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));