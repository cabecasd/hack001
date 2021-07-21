const { MongoClient, ObjectId } = require("mongodb");
const URI = "mongodb://localhost:27017"
let client;

async function connect(uri) {
    if (client) return client;
    client = new MongoClient(uri, {
        useUnifiedTopology: true
    })
    await client.connect();
    return client;
}

async function getCollection(dbName, collectionName) {
    const client = await connect(URI);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection;
}


async function getLoginStatus(values) {
    console.log(values)
    const collection = getCollection("users","users")

}

module.exports = {
    getLoginStatus
}