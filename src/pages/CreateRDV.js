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
    const [result, setresult] = useState('');
    // Decode the JWT token
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    useEffect(() => {
        setpatientId(decoded.Id)
        fetch("https://localhost:7248/rdvs/horaires", {
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
                console.error(error.toString());
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
            const response = await fetch('https://localhost:7248/rdvs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Date: rendezVousData.Date,
                    Heure: rendezVousData.Heure + ':00',
                    MedecinID: rendezVousData.MedecinID,
                    PatientID: rendezVousData.PatientID,
                })
            });
            console.log(rendezVousData);
            if (response.ok) {
                setresult("Rendez vous crée avec succes.")
            } else {
                const errorBody = await response.text();
                throw new Error(errorBody || 'Something went wrong with the request.');
            }
        } catch (error) {
            setresult(error.toString())
            console.log(result);
        }
    };


    return (
        <>
            <Header />

            <form className="p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="heure" className="block text-gray-700">Heure</label>
                    <input
                        id="heure"
                        type="time"
                        value={heure}
                        onChange={(e) => setHeure(e.target.value)}
                        required
                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="medecinId" className="block text-gray-700">Médecin</label>
                    <select
                        id="medecinId"
                        value={medecinId}
                        onChange={(e) => setMedecinId(e.target.value)}
                        required
                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
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
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Créer un Rendez-vous
                </button>
                <h2>{result}</h2>
            </form>

            <Footer />
        </>
    );
};

export default CreateRDV;
