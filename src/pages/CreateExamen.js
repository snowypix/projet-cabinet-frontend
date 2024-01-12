import React, { useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

const CreateExamen = () => {
    const id = useParams();
    const [examen, setExamen] = useState({
        ExamenDate: '',
        ExamenNom: '',
        Resultat: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7248/examen/${id.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(examen),
            });
            if (response.ok) {
                // Handle success
                console.log('Examen created successfully');
            } else {
                // Handle error
                console.error('Failed to create examen');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        setExamen({ ...examen, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header></Header>
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="block text-gray-700 text-xl font-bold mb-2">Create Examen</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ExamenDate">
                            Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ExamenDate"
                            type="date"
                            name="ExamenDate"
                            value={examen.examenDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ExamenNom">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="ExamenNom"
                            type="text"
                            name="ExamenNom"
                            value={examen.examenNom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Resultat">
                            Result
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="Resultat"
                            type="text"
                            name="Resultat"
                            value={examen.resultat}
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

export default CreateExamen;
