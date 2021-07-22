const JSON_USERS ="./populate/users.json"
const fs = require('fs');
const { MongoClient } = require("mongodb");
const URI = "mongodb://localhost:27017"
let client;

async function sendToMongo() {
    const jsonUsers = await readFile(JSON_USERS)
    sendUsersToMongo(jsonUsers)
}

async function readFile(memory) {
    const memoryD = fs.readFileSync(memory)
    const memory2 = JSON.parse(memoryD.toString())
    return memory2
}

async function sendUsersToMongo(jsonUsers) { // envia categorias para o mongo
    const collection = await getCollection("users", "users") // vai esperar até buscar alimentos dentro da colecao categorias
    const result = await collection.insertMany(jsonUsers.users)  // insere info de categorias na colecao categorias do mongo
    return result
}

async function getCollection(dbName, collectionName) { // vai buscar a colecao collectionName dentro de dbName
    const client = await connect(URI);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection;
}

async function connect(uri) { // liga ao mongo
    try {
        if (client) return client; // se o cliente tiver ligado nao volta a ligar 
        client = new MongoClient(uri, {
            useUnifiedTopology: true
        })

        await client.connect(); // espera ate o cliente se ligar

        return client;
    } catch (err) {
        console.log(`[ERRO]: ${err}`)
    }
}

sendToMongo()