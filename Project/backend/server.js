const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
    });

app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello from the API!' });
    });
    

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
