import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import UpdateForm from '@/components/UpdateForm';
import { useRouter } from 'next/router';

function BookList({ username }) {
    const [books, setBooks] = useState([])
    const [editingBook, setEditingBook] = useState(null)

    useEffect(() => {
        fetch(`/api/books?username=${username}`)
            .then((res) => res.json())
            .then((data) => setBooks(data))
    }, [username])

    const handleDelete = async (bookId) => {
        try {
            const response = await fetch(`/api/books/${bookId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId))
            } else {
                console.error('Failed')
            }
        } catch (error) {
            console.error('Error')
        }
    }

    const handleUpdateClick = (book) => {
        setEditingBook(book);
    }

    const handleUpdateSubmit = async (updatedBook) => {
        try {
            const response = await fetch(`/api/books/${updatedBook._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            })

            if (response.ok) {
                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book._id === updatedBook._id ? updatedBook : book
                    )
                )
                setEditingBook(null)
            } else {
                const errorData = await response.json()
                console.error('Failed')
            }
        } catch (error) {
            console.error('Error')
        }
    };

    return (
        <div className="bg-yellow-100 p-8 rounded-lg border-4 border-yellow-900 w-full max-w-4xl mx-auto mt-8">
            <table className="w-full">
                <thead>
                <tr>
                    <th className="text-left">Title</th>
                    <th className="text-left">Author</th>
                    <th className="text-left">Genre</th>
                    <th className="text-left">Rating</th>
                    <th className="text-left">Read Status</th>
                    <th className="text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book._id} className="border-b border-yellow-900">
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.rating}</td>
                        <td>{book.readStatus}</td>
                        <td>
                            <button onClick={() => handleUpdateClick(book)} className="mr-2 text-yellow-900 underline hover:text-yellow-800">Update</button>
                            <button onClick={() => handleDelete(book._id)} className="text-red-600 underline hover:text-red-500">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingBook && (
                <UpdateForm book={editingBook} onSubmit={handleUpdateSubmit} onCancel={() => setEditingBook(null)}/>
            )}
        </div>
    )
}

function BookForm({ username }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [rating, setRating] = useState('None')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const readStatus = rating === 'None' ? 'Not Read' : 'Read';
        const book = { title, author, genre, rating, username, readStatus }
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            })
            const data = await response.json();

            if (response.ok) {
                setTitle('')
                setAuthor('')
                setGenre('')
                setRating('None')
                window.location.reload()
            } else {
                console.error('Error')
            }
        } catch (error) {
            console.error('Submission error:')
        }
    };

    return (
        <div className="bg-yellow-100 p-8 rounded-lg border-4 border-yellow-900 w-full max-w-4xl mx-auto mt-8">
            <h2 className="text-3xl font-semibold text-center text-yellow-900 mb-6">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full px-4 py-2 border border-yellow-900 rounded-lg"/>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full px-4 py-2 border border-yellow-900 rounded-lg"/>
                <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" className="w-full px-4 py-2 border border-yellow-900 rounded-lg"/>
                <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full px-4 py-2 border border-yellow-900 rounded-lg">
                    <option value="None">None</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit" className="w-full py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800">Add Book</button>
            </form>
        </div>
    )
}

export default function Collection() {
    const { data: session } = useSession()
    const router = useRouter()

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' })
    }

    if (!session) {
        return <p>You are not signed in</p>;
    }

    return (
        <div className="min-h-screen bg-yellow-50 p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold text-yellow-900">Welcome, {session.user.name}!</h2>
                <button onClick={handleLogout} className="px-4 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800">Logout</button>
            </div>
            <BookForm username={session.user.name} />
            <BookList username={session.user.name} />
        </div>
    )
}
