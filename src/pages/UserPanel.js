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

            <div class="p-4">
                <p class="flex gap-4">
                    <Link to="/user-panel/rdvs" class="text-blue-500">Consulter les RDVs</Link>
                    <Link to="/user-panel/create" class="text-blue-500">Créer un rendez-vous</Link>
                    <Link to="/user-panel/treatments" class="text-blue-500">Consulter les traitements</Link>
                </p>
            </div>

            <Footer />
        </>
    );
};

export default UserPanel;
