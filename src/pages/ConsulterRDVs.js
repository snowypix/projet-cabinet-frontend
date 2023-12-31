import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ConsulterRDVs = () => {
    const [rdvs, setRDVs] = useState([]);

    useEffect(() => {
        // Get the ID from the decoded token
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        // Make the API request to fetch RDVs data
        fetch(`https://localhost:7248/User/rdv/rdvs/${decoded.Id}`)
            .then(response => response.json())
            .then(data => setRDVs(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header></Header>
            <h1 class="text-2xl font-bold mb-4">RDVs List</h1>

            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Date</th>
                        <th class="px-4 py-2">Heure</th>
                        <th class="px-4 py-2">Nom Medecin</th>
                    </tr>
                </thead>
                <tbody>
                    {rdvs.map(rdv => (
                        <tr key={rdv.rdvId}>
                            <td class="px-4 py-2">{rdv.date}</td>
                            <td class="px-4 py-2">{rdv.heure}</td>
                            <td class="px-4 py-2">{rdv.medecinName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer></Footer>
        </>
    );
};

export default ConsulterRDVs;