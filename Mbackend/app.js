const express = require('express');
const {connectDB, getDB} = require('./db');

const app = express();

let db

connectDB((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
        db = getDB()
    }
});

app.get('/', (req, res) => {
    res.send('Hello World');
});