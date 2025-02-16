import { signIn } from 'next-auth/react';
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

export default function Home() {
    const [error, setError] = useState(null)
    const [isLoginForm, setIsLoginForm] = useState(true);
    const handleLogin = async (username, password) => {
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        })
        if (result.error) {
            setError(result.error);
        } else {
            window.location.href = '/collection';
        }
    }
    const handleRegister = async (username, password) => {
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            const data = await response.json();
            if (response.ok) {
                setError('Registration successful! Please login.')
                setIsLoginForm(true);
            } else {
                setError(data.error || 'Registration failed')
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Failed to register');
        }
    }
    return (
        <div className="min-h-screen bg-yellow-50 flex justify-center items-center">
            <div className="bg-yellow-100 p-8 rounded-lg border-4 border-yellow-900 w-full max-w-md">
                {isLoginForm ? (
                    <>
                        <h2 className="text-3xl font-semibold text-center text-yellow-900 mb-6">Login</h2>
                        <LoginForm onLogin={handleLogin} error={error} />
                        <p className="mt-4 text-center text-yellow-900"> Don't have an account?{' '}
                            <button onClick={() => setIsLoginForm(false)} className="text-yellow-900 underline hover:text-yellow-800">Register here</button>
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-semibold text-center text-yellow-900 mb-6">Register</h2>
                        <RegisterForm onRegister={handleRegister} error={error} />
                        <p className="mt-4 text-center text-yellow-900"> Already have an account?{' '}
                            <button onClick={() => setIsLoginForm(true)} className="text-yellow-900 underline hover:text-yellow-800">Login here</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}