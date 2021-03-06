const { MongoClient, ObjectId } = require("mongodb");
const URI = "mongodb://localhost:27017"
let client;

const DB_NAME = "users"

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
    const user = await collection.find({ username: values.username }).toArray()
    return user
}

function checkIfPasswordIsRight(user, password) {
    if (user[0].password === password) {
        return { user: user[0] }
    } else {
        return false
    }
}

async function getUserById(id) {
    const collection = await getCollection("users", "users")
    const user = await collection.find({ _id: ObjectId(id) }).toArray()
    return user
}

async function getUserByUsername(username) {
    const collection = await getCollection("users", "users")
    const user = await collection.find({ username: username }).toArray()
    return user
}

async function createUser(values) {
    const collection = await getCollection("users", "users")
    //pesquisa na colecao se o user ja existe
    const alreadyExists = await findUserByUsername(collection, values)
    //se ja existir nao deixa criar conta
    if (alreadyExists.length > 0) {
        return false
    } else {
        values.private = false
        values.description = ""
        values.cellNumber = ""
        values.summary = ""
        const user = await collection.insertOne(values)
        return user
    }
}

async function togglePrivateStatus(userId, newState) {
    const collection = await getCollection("users", "users")
    await collection.updateOne(
        { _id: ObjectId(userId) },
        { $set: { private: newState } }
    )
}

async function getloginInfo(values) {
    const collection = await getCollection("users", "users")
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

async function getAllAds() {
    const collection = await getCollection("users", "users")
    const allAds = await collection.find().toArray()
    let adsArray = []
    for (let i = 0; i < allAds.length; i++) {
        const ad = allAds[i]
        if(!ad.private) {
            adsArray.push({
                username: ad.username,
                fullName: ad.fullName,
                description: ad.description,
                summary: ad.summary,
            })
        }
    }
    return adsArray
}

async function updateUserProfile(userId, values) {
    const collection = await getCollection("users", "users")
    const res = await collection.updateOne(
        { _id: ObjectId(userId) },
        {
            $set: {
                email: values.email,
                description: values.description,
                path: values.path
            }
        }
    )
    return res
}

async function getPossibleAdsByDescription(values) {
    const collection = await getCollection("users", "users")
    const foundDescriptions = await collection.find({ description: { $regex: `.*${values}.*`, $options: "i" } }).toArray()
    return foundDescriptions
}
async function getPossibleAdsBySummary(values) {
    const collection = await getCollection("users", "users")
    const foundDescriptions = await collection.find({ summary: { $regex: `.*${values}.*`, $options: "i" } }).toArray()
    return foundDescriptions
}


async function insertAdvertising(advertising){ //insere na base de dados do front na collection advertasing
    const collection = await getCollection(DB_NAME, "advertising");
    const res = await collection.insertOne(advertising);
    return res.insertedId;
}

module.exports = {
    getloginInfo,
    createUser,
    getUserById,
    togglePrivateStatus,
    updateUserProfile,
    getAllAds,
    insertAdvertising,
    getUserByUsername,
    getPossibleAdsByDescription,
    getPossibleAdsBySummary
}