import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ConsulterRDVsMedecin = () => {
    const [rdvs, setRDVs] = useState([]);

    useEffect(() => {
        // Get the ID from the decoded token
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        // Make the API request to fetch RDVs data
        fetch(`https://localhost:7248/rdvs/med/${decoded.Id}`)
            .then(response => response.json())
            .then(data => setRDVs(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header></Header>
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">RDVs List</h1>

            <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Heure
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Nom Patient
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rdvs.map(rdv => (
                        <tr key={rdv.rdvId} className="hover:bg-gray-100">
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{rdv.date}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{rdv.heure}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{rdv.patientName}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer></Footer>
        </>

    );
};

export default ConsulterRDVsMedecin;