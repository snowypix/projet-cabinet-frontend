import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Navigate } from 'react-router';

const Register = () => {
    const [FullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [genre, setGenre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            FullName,
            email,
            password,
            age,
            genre
        };

        fetch("https://localhost:7248/User/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user)
        })
            .then((res) => {
                res.text().then((text) => console.log(text));
                Navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Header></Header>
            <div className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-center text-2xl font-semibold">Sign Up</h2>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" value={FullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="homme">Homme</label>
                        <input type="radio" id="homme" name="genre" value="homme" onChange={(e) => setGenre(e.target.value)} />
                        <label htmlFor="femme">Femme</label>
                        <input type="radio" id="femme" name="genre" value="femme" onChange={(e) => setGenre(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    {/* Include additional fields as needed */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Register;