import { MongoClient } from "mongodb";

const url = "mongodb+srv://mefrattasio:CeceLucy@cluster0.3gcgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let db;

export async function connectToDatabase() {
    if (!db) {
        try {
            await client.connect();
            console.log("Connected to MongoDB")
            db = client.db("webwarea4")
        } catch (error) {
            console.error("Failed to connect to MongoDB", error)
            throw new Error("Database connection failed")
        }
    }
    return db
}

export async function getCollection(name) {
    const database = await connectToDatabase()
    return database.collection(name)
}
