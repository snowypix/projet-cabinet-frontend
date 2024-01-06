import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DossierMedical = () => {
    const [dossiers, setdossiers] = useState([]);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    useEffect(() => {
        fetch(`https://localhost:7248/dossier/dossiers/${decoded.Id}`, {
            method: "GET",
            credentials: 'include'
        })
            .then(response => response.json()) // Parse response to JSON
            .then(data => {
                setdossiers(data);
            })
            .catch(error => {
                console.error('There was an error fetching the patients!', error);
            });
    }, []);

    const handleCreateDossier = (patientId) => {
        // You would call the API to create a dossier here
        fetch(`https://localhost:7248/dossier/create/${patientId}/${decoded.Id}`
            , {
                method: "POST",
                credentials: 'include'
            })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                window.location.reload();
            });
    };

    return (
        <>
            <Header />
            <main>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border border-gray-200 text-left">Nom</th>
                                <th className="px-4 py-2 border border-gray-200 text-left">Dossier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dossiers.map((dossier) => (
                                <tr key={dossier.patientID} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border border-gray-200">{dossier.patientName}</td>
                                    <td className="px-4 py-2 border border-gray-200">
                                        {dossier.dossierExists ? (
                                            <Link to={`/dossiermedical/${dossier.patientID}`} className="text-blue-500 hover:underline">
                                                Voir dossier médical
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => handleCreateDossier(dossier.patientID)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                                            >
                                                Créer dossier
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>

    );
};

export default DossierMedical;
