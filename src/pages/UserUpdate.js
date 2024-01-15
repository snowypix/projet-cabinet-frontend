import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const UserUpdate = () => {
    const id = useParams();
    const [newUser, setNewUser] = useState({
        Email: '',
        Password: '',
        FullName: '',
        Genre: 'Homme',
        Age: '',
        Adresse: '',
        UserType: 'Patient',
        Antecedents: '',
        HoraireD: '',
        HoraireF: '',
        // Add other properties as needed
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7248/User/modify/${id.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();
            console.log('Success:', data);

            // Reset the form and fetch updated user list
            setNewUser({
                Email: '',
                Password: '',
                FullName: '',
                Genre: '',
                Age: '',
                Adresse: '',
                UserType: '',
                Antecedents: '',
                HoraireD: '',
                HoraireF: '',
                // Add other properties as needed
            });
        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    };

    const renderAdditionalFields = () => {
        const userType = newUser.UserType;

        if (userType === 'Patient') {
            return (
                <>
                    <br></br>
                    <input
                        type="text"
                        name="Antecedents"
                        value={newUser.Antecedents}
                        onChange={handleInputChange}
                        placeholder="Antecedents"
                        className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </>
            );
        } else if (userType === 'Médecin' || userType === 'Infirmier') {
            return (
                <>
                    <br></br>
                    <input
                        type="time"
                        name="HoraireDebut"
                        value={newUser.HoraireD}
                        onChange={handleInputChange}
                        placeholder="HorarireDebut"
                        className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="time"
                        name="HoraireFin"
                        value={newUser.HoraireF}
                        onChange={handleInputChange}
                        placeholder="HorarireFin"
                        className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <HeaderAdmin />
            <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-700">Update User</h2>

                <div className="space-y-4">
                    <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="Email" value={newUser.Email} onChange={handleInputChange} placeholder="Email" />
                    <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="FullName" value={newUser.FullName} onChange={handleInputChange} placeholder="Nom complet" />
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="Genre"
                        value={newUser.Genre}
                        onChange={handleInputChange}
                    >
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                    </select>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" name="Age" value={newUser.Age} onChange={handleInputChange} placeholder="Age" />
                    <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="Adresse" value={newUser.Adresse} onChange={handleInputChange} placeholder="Adresse" />

                    <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="UserType" value={newUser.UserType} onChange={handleInputChange}>
                        <option value="Admin">Admin</option>
                        <option value="Patient">Patient</option>
                        <option value="Médecin">Médecin</option>
                        <option value="Infirmier">Infirmier</option>
                    </select>
                    {renderAdditionalFields()}
                </div>

                <br />
                <button onClick={handleEditUser} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">Update user</button>
            </div>


            <Footer />
        </>
    );

};
export default UserUpdate;
