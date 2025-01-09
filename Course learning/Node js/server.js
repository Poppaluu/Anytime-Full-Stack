import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
/*
  console.log(req.url);
  console.log(req.method);
*/

  try {
    if(req.method === 'GET') {
      if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Hello world!<h1>");
      }
      else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>About us<h1>");
        return;
      }
      else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>Page not found<h1>");
      }
    }
    else if(req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        console.log(body);
      });
    }
    else {
      throw new Error('Method not allowed');
    }

  } catch (error) { 
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end("Server error");
  }

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});