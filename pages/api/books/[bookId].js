import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    const booksCollection = await getCollection("books")
    if (!booksCollection) {
        return res.status(500).json({ error: "Failed to connect to the database" })
    }

    const { bookId } = req.query;
    if (!ObjectId.isValid(bookId)) {
        return res.status(400).json({ error: "Invalid book ID" })
    }

    if (req.method === "DELETE") {
        try {
            const result = await booksCollection.deleteOne({ _id: new ObjectId(bookId) })

            if (result.deletedCount === 1) {
                res.status(200).json({ message: "Book deleted" })
            } else {
                res.status(404).json({ error: "Book not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to delete" })
        }
    } else if (req.method === "PUT") {
        try {
            const updatedBook = req.body;
            if (!updatedBook || typeof updatedBook !== "object") {
                return res.status(400).json({ error: "Wrong book data" })
            }

            const { _id, ...bookData } = updatedBook;

            const result = await booksCollection.updateOne(
                { _id: new ObjectId(bookId) },
                { $set: bookData }
            );

            if (result.modifiedCount === 1) {
                res.status(200).json({ message: "Book updated" })
            } else {
                res.status(404).json({ error: "Book not found" })
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to update" });
        }
    } else {
        res.status(405).json({ message: "Not allowed" })
    }
}