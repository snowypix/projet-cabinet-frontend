import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Assuming Header is in the same directory
import Footer from '../components/Footer'; // Assuming Footer is in the same directory
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userLoggedIn = token ? true : false;
        setIsLoggedIn(userLoggedIn);
        toast.success('Notification message');
    }, []);

    return (

        <div className="flex flex-col h-screen justify-between">
            <Header />
            <ToastContainer />
            <main className="mb-auto">
                <section className="text-center p-10">
                    <h2 className="text-4xl font-bold mb-5">Bienvenue dans la page de notre cabinet</h2>
                    <p className="text-xl mb-5">Toujours pour répondre a vos besoins.</p>
                    {isLoggedIn ? (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"><Link to="user-panel">Mon espace personnel</Link></button>
                    ) : (
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"><Link to="login">Connexion</Link></button>
                    )}
                </section>
                <section className="p-10 bg-gray-100">
                    <h3 className="text-3xl font-semibold mb-3">Our Services</h3>
                    <p>Learn more about the comprehensive medical services we offer.</p>
                    {/* Additional content can be added here */}
                </section>
                {/* More sections can be added as needed */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;
