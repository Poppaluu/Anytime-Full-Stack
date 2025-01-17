import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

//get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("dirname: ", __dirname);
console.log("filename: ", __filename);

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
/*
  console.log(req.url);
  console.log(req.method);
*/

  try {
    if(req.method === 'GET') {
      let filepath;
      if (req.url === '/') {
        filepath = path.join(__dirname, 'public', 'index.html')
      }
      else if (req.url === '/about') {
        filepath = path.join(__dirname, 'public', 'about.html')
      }
      else {
        throw new Error('Page not found');
      }
      
      const data = await fs.readFile(filepath);
      res.setHeader('content-Type', 'text/html');
      res.write(data);
      res.end();
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