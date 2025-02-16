import { getCollection } from "@/lib/mongodb";

export default async function handler(req, res) {
    const usersCollection = await getCollection("users");
    if (req.method === "POST") {
        try {
            const { username, password } = req.body;
            const existingUser = await usersCollection.findOne({ username })
            if (existingUser) {
                return res.status(400).json({ error: "User already exists!" })
            }

            await usersCollection.insertOne({ username, password })
            res.status(201).json({ message: "registered successfully" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to register" })
        }
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}
