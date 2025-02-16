import { getCollection } from "@/lib/mongodb";

export default async function handler(req, res) {
    const usersCollection = await getCollection("users");
    if (req.method === "POST") {
        try {
            const { username, password } = req.body;
            const user = await usersCollection.findOne({ username, password })
            if (!user) {
                return res.status(400).json({ error: "Wrong username or password" })
            }

            res.status(200).json({ message: "Login successful" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to login" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}

