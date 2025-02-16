import { useState } from "react";

export default function UpdateForm({ book, onSubmit, onCancel }) {
    const [title, setTitle] = useState(book.title)
    const [author, setAuthor] = useState(book.author)
    const [genre, setGenre] = useState(book.genre)
    const [rating, setRating] = useState(book.rating)

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedBook = {...book, title, author, genre, rating, readStatus: rating === "None" ? "Not Read" : "Read"}
        onSubmit(updatedBook)
    }

    return (
        <div className="bg-yellow-100 p-6 rounded-lg  max-w-md mx-auto mt-6">
            <h3 className="text-xl font-bold mb-4 text-center">Update Book</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full px-4 py-2 border border-gray-300 rounded-lg "/>
                <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" className="w-full px-4 py-2 border border-gray-300 rounded-lg "/>
                <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg ">
                    <option value="None">None</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div className="flex space-x-4">
                    <button type="submit" className="flex-1 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800">Save</button>
                    <button type="button" onClick={onCancel} className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"> Cancel </button>
                </div>
            </form>
        </div>
    );
}