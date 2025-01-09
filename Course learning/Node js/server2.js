import { createServer} from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' }
];

// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

//JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

//route handler for /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
};

//Route handler for GET /api/Users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(user));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
}

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const user = JSON.parse(body);
        users.push(user);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(user));
        res.end();
    });
}

//not found handler
const notFoundHandler = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
}

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler(req, res);
            } 
            else if (req.url.match(/\/api\/users\/\d+/) && req.method === 'GET') {
                getUserByIdHandler(req, res);
            }
            else if (req.url === '/api/users' && req.method === 'POST') {
                createUserHandler(req, res);
            }
            else {
                notFoundHandler(req, res);
            }
        })
    });
});

server.listen(PORT, () => {
    console.log('Server is running on port', PORT);    
}); 