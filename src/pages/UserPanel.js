import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserPanel = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userLoggedIn = token ? true : false;

    // Use useEffect to handle the navigation
    useEffect(() => {
        if (!userLoggedIn) {
            console.log('Logged in? ' + userLoggedIn);
            navigate("/login");
        }
    }, [userLoggedIn, navigate]); // Add dependencies here

    return (
        <>
            <Header />
            <div className="p-4">
                <div className="flex flex-wrap gap-4">
                    <div className="card bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300">
                        <img src="rdv.png" alt="1" className="w-full h-32 sm:h-48 object-cover" />
                        <Link to="/user-panel/rdvs" className="text-blue-500 hover:text-blue-600">Consulter les RDVs</Link>
                    </div>

                    <div className="card bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300">
                        <img src="rdv.png" alt="2" className="w-full h-32 sm:h-48 object-cover" />
                        <Link to="/user-panel/create" className="text-blue-500 hover:text-blue-600">Créer un rendez-vous</Link>
                    </div>

                    <div className="card bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300">
                        <img src="traitement.png" alt="3" className="w-full h-32 sm:h-48 object-cover" />
                        <Link to="/user-panel/traitements" className="text-blue-500 hover:text-blue-600">Consulter les traitements</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default UserPanel;
