
// SignUp.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Add additional state variables as needed

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the sign-up logic here
    };

    return (
        <>
            <Header></Header>
            <div className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-center text-2xl font-semibold">Sign Up</h2>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
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
