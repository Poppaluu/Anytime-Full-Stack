import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Get current path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Setup static folder
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.use('/api/posts', posts);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});