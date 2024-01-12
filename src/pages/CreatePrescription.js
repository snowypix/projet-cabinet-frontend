import React, { useState } from 'react';
import { useParams } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreatePrescription = () => {
    const id = useParams();
    const [prescription, setPrescription] = useState({
        prescriptionDate: '',
        medicaments: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7248/prescription/${id.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prescription),
            });
            if (response.ok) {
                // Handle success
                console.log('Prescription created successfully');
            } else {
                // Handle error
                console.error('Failed to create prescription');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        setPrescription({ ...prescription, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header></Header>
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="block text-gray-700 text-xl font-bold mb-2">Create Prescription</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prescriptionDate">
                            Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="prescriptionDate"
                            type="date"
                            name="prescriptionDate"
                            value={prescription.prescriptionDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicaments">
                            Medicaments
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="medicaments"
                            type="text"
                            name="medicaments"
                            value={prescription.medicaments}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </>
    );
};

export default CreatePrescription;
