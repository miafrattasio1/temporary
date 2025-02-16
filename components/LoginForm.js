import { useState } from 'react';

export default function LoginForm({ onLogin, error }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin(username, password)
    };

    return (
        <div className="bg-yellow-100">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-2 border border-yellow-900 rounded-lg"/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-yellow-900 rounded-lg"/>
                <button type="submit" className="w-full py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800">Login</button>
                {error && <p className="text-red-600 text-center">Please Register!</p>}
            </form>
        </div>
    )
}