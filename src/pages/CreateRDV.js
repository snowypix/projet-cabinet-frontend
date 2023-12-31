import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { jwtDecode } from 'jwt-decode';

const CreateRDV = () => {
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [medecinId, setMedecinId] = useState('');
    const [patientId, setpatientId] = useState(0);
    const [doctors, setDoctors] = useState([]);
    // Decode the JWT token
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    console.log(decoded.Id);
    useEffect(() => {
        setpatientId(decoded.Id)
        fetch("https://localhost:7248/User/horaires", {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
                if (data.length > 0) {
                    setMedecinId(data[0].id); // Assumes the doctor object has an 'id' field
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []); // Run this effect on mount

    const handleSubmit = async (event) => {
        event.preventDefault();
        const rendezVousData = {
            Date: date,
            Heure: heure,
            MedecinID: medecinId,
            PatientID: patientId,
        };

        try {
            const response = await fetch('https://localhost:7248/User/rdv/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Date: rendezVousData.Date,
                    Heure: rendezVousData.Heure,
                    MedecinID: rendezVousData.MedecinID,
                    PatientID: rendezVousData.PatientID,
                })
            });
            console.log(rendezVousData);
            if (response.ok) {
            } else {
                const errorBody = await response.text();
                throw new Error(errorBody || 'Something went wrong with the request.');
            }
        } catch (error) {
            console.error('Failed to create rendez-vous:', error);
        }
    };


    return (
        <>
            <Header />

            <form class="p-4" onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label for="date" class="block text-gray-700">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        class="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>

                <div class="mb-4">
                    <label for="heure" class="block text-gray-700">Heure</label>
                    <input
                        id="heure"
                        type="time"
                        value={heure}
                        onChange={(e) => setHeure(e.target.value)}
                        required
                        class="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>

                <div class="mb-4">
                    <label for="medecinId" class="block text-gray-700">Médecin</label>
                    <select
                        id="medecinId"
                        value={medecinId}
                        onChange={(e) => setMedecinId(e.target.value)}
                        required
                        class="border border-gray-300 px-3 py-2 rounded-md w-full"
                    >
                        {doctors.map((doctor, index) => (
                            <option key={index} value={doctor.id}>
                                {doctor.fullName} ({doctor.horaireDebut}-{doctor.horaireFin})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Créer un Rendez-vous
                </button>
            </form>

            <Footer />
        </>
    );
};

export default CreateRDV;
