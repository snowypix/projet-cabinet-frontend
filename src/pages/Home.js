// HomePage.js
import React from 'react';
import Header from '../components/Header'; // Assuming Header is in the same directory
import Footer from '../components/Footer'; // Assuming Footer is in the same directory

const Home = () => {
    return (
        <div className="flex flex-col h-screen justify-between">
            <Header />
            <main className="mb-auto">
                <section className="text-center p-10">
                    <h2 className="text-4xl font-bold mb-5">Welcome to Our Doctor's Office</h2>
                    <p className="text-xl mb-5">Providing compassionate care for your health and wellness</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Make an Appointment</button>
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
