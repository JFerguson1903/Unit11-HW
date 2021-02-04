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

// Retrieves information from the db,json
let getStoredNotes = () => {
    let databaseInfo = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    return databaseInfo;
}

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
    let currentStoredNotes = getStoredNotes();
    // Creates a unique ID by +1 to the current length
    let newNoteID = currentStoredNotes.length + 1;
    let newNote = req.body;
    newNote = Object.assign({ id: newNoteID }, newNote);
    currentStoredNotes.push(newNote);

    // Updating db.json with the new note
    fs.writeFileSync("./db/db.json", JSON.stringify(currentStoredNotes));
    res.json(currentStoredNotes);
});

app.delete('/api/notes/:id', (req, res) => {
    let currentStoredNotes = getStoredNotes();
    let noteID = req.params.id;

    // Removes trashed note
    let i = 1;
    let modifiedStoredNotes = currentStoredNotes.reduce(function(accumulator, currentValue) {
        if (currentValue.id !== parseInt(noteID)) {
            accumulator.push({ id: i, title: currentValue.title, text: currentValue.text });
            i++;
        }
        return accumulator
    }, [])

    // Updating db.json with the updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(modifiedStoredNotes));
    res.json(modifiedStoredNotes);
});

// Sets default route to be landing page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));