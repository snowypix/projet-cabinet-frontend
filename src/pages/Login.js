import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        };

        fetch("https://localhost:7248/User/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(user)
        })
            .then((res) => {
                // Parse the response body as JSON
                return res.json();
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    navigate("/");
                } else {
                    setError(data.message);
                }

            })
            .catch((error) => {
                setError(error);
            });
    };

    return (
        <>
            <Header></Header>
            <div className="max-w-sm mx-auto my-10 p-6 border border-gray-300 rounded">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-center text-2xl font-semibold">Login</h2>
                    <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> Invalid username or password.</span>
                        </div>
                    )}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
