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

async function findUserByUsername(collection, values) {
    const user = await collection.find({username: values.username}).toArray()
    return user
}

function checkIfPasswordIsRight(user, password) {
    if (user[0].password === password) {
        return {user: user[0]}
    } else {
        return false
    }
}

async function createUser(values) {
    const collection = await getCollection("users","users")
    //pesquisa na colecao se o user ja existe
    const alreadyExists = await findUserByUsername(collection, values)
    //se ja existir nao deixa criar conta
    if (alreadyExists.length > 0) {
        return false
    } else {
        return await collection.insertOne(values)
    }
}

async function getloginInfo(values) {
    const collection = await getCollection("users","users")
    const user = await findUserByUsername(collection, values)
    if (user.length === 0) {
        //se o username nao existe, para a funcao
        return false
    } else {
        //se o username existe, vai comparar a password
        const answer = checkIfPasswordIsRight(user, values.password)
        return answer
    }
}

module.exports = {
    getloginInfo,
    createUser
}