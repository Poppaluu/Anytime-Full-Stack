const express = require('express');

const router = express.Router();

app.get('/', (req, res) => {
    res.status(200).json({message: 'get goals'});
    });

app.post('/', (req, res) => {
    res.status(200).json({message: 'set goal!'});
    });

app.put('/:id', (req, res) => {
    res.status(200).json({message: `update goal ${req.params.id}`});
    });

app.delete('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
    });

module.exports = router;