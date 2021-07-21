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

async function updateUserProfile(userId, values) {
    const collection = await getCollection("users", "users")
    await collection.updateOne(
        { _id: ObjectId(userId) },
        {
            $set: {
                email: values.email,
                description: values.description
            }
        }
    )
}

module.exports = {
    getloginInfo,
    createUser,
    getUserById,
    togglePrivateStatus,
    updateUserProfile
}