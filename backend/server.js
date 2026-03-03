const express = require('express');
const dotenv =  require('dotenv')
const { MongoClient, Collection } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors')

dotenv.config()

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url)


//Database name
const dbName = 'passop';
const app = express()
const port = process.env.PORT || 3000;
app.use(bodyparser.json())
app.use(cors())

client.connect();

//Get all the password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
res.json(findResult)
});

//Save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true})
});

//Delete a password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
     const findResult = await collection.deleteOne(password);
    res.send({success: true})
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});