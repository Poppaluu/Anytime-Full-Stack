const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

app.use(express.json());

async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('mydatabase');
        const collection = database.collection('mycollection');

        // Serve the HTML file
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });

        // Insert a document route
        app.post('/insert', async (req, res) => {
            const document = { name: 'John Doe', age: 30 };
            const result = await collection.insertOne(document);
            res.json({ message: 'Document inserted', insertedId: result.insertedId });
        });

        // Fetch documents route
        app.get('/documents', async (req, res) => {
            const documents = await collection.find({}).toArray();
            res.json(documents);
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        // Uncomment the following line if you want to close the connection after the operations
        // await client.close();
    }
}

async function insertDocument(collection, document) {
    const result = await collection.insertOne(document);
    console.log(`Document inserted with _id: ${result.insertedId}`);
}

async function findDocuments(collection, query) {
    const documents = await collection.find(query).toArray();
    console.log('Found documents:', documents);
    return documents;
}

async function updateDocument(collection, filter, update) {
    const result = await collection.updateOne(filter, { $set: update });
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);
}

async function deleteDocument(collection, filter) {
    const result = await collection.deleteOne(filter);
    console.log(`Deleted ${result.deletedCount} document(s)`);
}

// Example route to find a document by name
app.get('/documents/:name', async (req, res) => {
    const name = req.params.name;
    const document = await collection.findOne({ name: name });
    if (document) {
        res.json(document);
    } else {
        res.status(404).send('Document not found');
    }
});

function isUserOver18(document) {
    return document.age > 18;
}

main().catch(console.error);