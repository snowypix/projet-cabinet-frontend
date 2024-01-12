import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Prescription = ({ prescription }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h4 className="font-bold text-lg text-indigo-600">Prescription {prescription.prescriptionID}</h4>
        <p className="text-gray-700">Date: <span className="text-gray-600">{prescription.prescriptionDate}</span></p>
        <p className="text-gray-700">Medicaments: <span className="text-gray-600">{prescription.medicaments}</span></p>
    </div>
);
const Examen = ({ examen }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h4 className="font-bold text-lg text-indigo-600">Examen {examen.ExamenID}</h4>
        <p className="text-gray-700">Date: <span className="text-gray-600">{examen.examenDate}</span></p>
        <p className="text-gray-700">Name: <span className="text-gray-600">{examen.examenNom}</span></p>
        <p className="text-gray-700">Result: <span className="text-gray-600">{examen.resultat}</span></p>
    </div>
);
const PageDossier = () => {
    const id = useParams();
    const navigate = useNavigate();
    const [prescriptions, setPrescriptions] = useState([]);
    const [examens, setExamens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleCreatePrescription = () => {
        navigate(`/create-prescription/${id.id}`);
    };

    const handleCreateExamen = () => {
        navigate(`/create-examen/${id.id}`);
    };
    useEffect(() => {
        Promise.all([
            fetch(`https://localhost:7248/prescription/${id.id}`).then(res => res.json()),
            fetch(`https://localhost:7248/examen/${id.id}`).then(res => res.json())
        ])
            .then(([prescriptionData, examenData]) => {
                setPrescriptions(prescriptionData);
                setExamens(examenData);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (error) return <div className="text-red-600 text-center py-5">Error: {error}</div>;

    return (
        <>
            <Header></Header>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dossier {id.id}</h2>
                <div className="mb-4">
                    <button
                        onClick={handleCreatePrescription}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Create Prescription
                    </button>
                    <button
                        onClick={handleCreateExamen}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Examen
                    </button>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Prescriptions</h3>
                    {prescriptions.map(prescription => (
                        <Prescription key={prescription.PrescriptionID} prescription={prescription} />
                    ))}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Examens</h3>
                    {examens.map(examen => (
                        <Examen key={examen.ExamenID} examen={examen} />
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default PageDossier;