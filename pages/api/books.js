import { getCollection } from "@/lib/mongodb";

export default async function handler(req, res) {
    const booksCollection = await getCollection("books")

    if (req.method === "POST") {
        try {
            const { title, author, genre, rating, username, readStatus } = req.body;

            const result = await booksCollection.insertOne({title, author, genre, rating, username, readStatus})

            res.status(201).json({ message: "Book added successfully", bookId: result.insertedId })
        } catch (error) {
            res.status(500).json({ error: "Failed to add book" })
        }
    } else if (req.method === "GET") {
        try {
            const { username } = req.query;
            const books = await booksCollection.find({ username }).toArray()
            res.status(200).json(books)
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch books" })
        }
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}