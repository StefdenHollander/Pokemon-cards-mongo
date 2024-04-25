
import express from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

import { MongoClient, ServerApiVersion } from 'mongodb';


const app = express();

const port = 3000;

app.use(express.static('public'));

app.use(cors());

dotenv.config();

const databaseUrl = process.env.CONNECTION_URL;

const client = new MongoClient(databaseUrl, {
   
    serverApi: {

        version: ServerApiVersion.v1,

        strict: true,

        deprecationErrors: true,

    }

});

app.get('/', (req, res) => {

    res.send('Hello World!');

});

async function fetchpokemon() {
    try {
        await client.connect();

        const database = client.db('MyFirstDatabase');

        const collection = database.collection('Pokemon');

        const Pokemon = await collection.find().toArray();

        return Pokemon;

    } finally {
        console.log("-----------------------------");
        await client.close()

    }
}


app.get('/Pokemons', (req, res) => {

    fetchpokemon().then(Pokemon => {

        res.json(Pokemon);

    });

});

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`);

});



