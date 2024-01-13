import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Assuming Header is in the same directory
import Footer from '../components/Footer'; // Assuming Footer is in the same directory
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
const Home = () => {
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUsertype] = useState('');
    const [url, setUrl] = useState('');
    // toast.success('Notification message');
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userLoggedIn = token ? true : false;
        if (userLoggedIn) {
            const decoded = jwtDecode(token);
            setIsLoggedIn(userLoggedIn);
            if (decoded.Type === "Patient") {
                setUsertype("Patient");
                setUrl("https://localhost:7248/rdvs/");
            } else if (decoded.Type === "Medecin") {
                setUsertype("Medecin");
                setUrl("https://localhost:7248/rdvs/med/");
            }
            fetch(`${url}${decoded.Id}`)
                .then(response => response.json())
                .then(data => {
                    const now = new Date();
                    data.forEach(appointment => {
                        const modifiedDate = appointment.date.replace(/T.*$/, `T${appointment.heure}`);

                        const appointmentDateTime = new Date(modifiedDate);

                        const differenceInTime = appointmentDateTime - now;
                        const differenceInHours = differenceInTime / (1000 * 60 * 60);
                        console.log("diff in time : " + differenceInHours);
                        const isWithinOneDay = differenceInHours <= 24;
                        if (isWithinOneDay && (differenceInHours >= 0)) {
                            toast.success(`vous avez un rendez vous à : ${modifiedDate}`);
                        }
                    });
                })
                .catch(error => console.error(error));
        }
    }, [url]);

    return (

        <div className="flex flex-col h-screen justify-between">
            <Header />
            <ToastContainer />
            <main className="mb-auto">
                <section className="text-center p-10">
                    <h2 className="text-4xl font-bold mb-5">Bienvenue dans la page de notre cabinet</h2>
                    <p className="text-xl mb-5">Toujours pour répondre a vos besoins.</p>
                    {userType === "Patient" ? (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            <Link to="user-panel">Mon espace personnel</Link>
                        </button>
                    ) : userType === "Medecin" ? (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            <Link to="doctor-panel">Mon espace médecin</Link>
                        </button>
                    ) : (
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            <Link to="login">Connexion</Link>
                        </button>
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
