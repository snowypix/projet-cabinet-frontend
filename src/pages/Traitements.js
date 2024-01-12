import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { jwtDecode } from 'jwt-decode';

const Prescription = ({ prescription }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h4 className="font-bold text-lg text-indigo-600">Prescription {prescription.prescriptionID}</h4>
        <p className="text-gray-700">Date: <span className="text-gray-600">{prescription.prescriptionDate}</span></p>
        <p className="text-gray-700">Medicaments: <span className="text-gray-600">{prescription.medicaments}</span></p>
    </div>
);
const Traitements = () => {
    const token = localStorage.getItem('token');
    const decoded = token ? jwtDecode(token) : '';
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`https://localhost:7248/prescription/patient/${decoded.Id}`)
            .then(res => res.json())
            .then((prescriptionData) => {
                setPrescriptions(prescriptionData);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [decoded.Id]);

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (error) return <div className="text-red-600 text-center py-5">Error: {error}</div>;

    return (
        <>
            <Header></Header>
            <div className="container mx-auto px-4 py-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Prescriptions</h3>
                    {prescriptions.map(prescription => (
                        <Prescription key={prescription.PrescriptionID} prescription={prescription} />
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Traitements;