"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('mdmehedihasan2360@gmail.com');
    const [password, setPassword] = useState('1234');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (email === 'mdmehedihasan2360@gmail.com' && password === '1234') {
            localStorage.setItem('admin-auth', 'valid');
            router.push('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isLoggedIn = localStorage.getItem('admin-auth') === 'valid';
            if (isLoggedIn) router.push('/admin');
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>
                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}

