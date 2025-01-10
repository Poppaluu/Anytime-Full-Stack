const express = require('express');
const path = require('path');


const app = express();

let posts = [
    {id: 1, title: 'Post 1', body: 'This is post 1'},
    {id: 2, title: 'Post 2', body: 'This is post 2'},
    {id: 3, title: 'Post 3', body: 'This is post 3'},
    {id: 4, title: 'Post 4', body: 'This is post 4'},
    {id: 5, title: 'Post 5', body: 'This is post 5'}
];

//setup static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});