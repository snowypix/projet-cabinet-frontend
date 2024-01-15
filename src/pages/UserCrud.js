import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import Footer from '../components/Footer';

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
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

    useEffect(() => {
        // Fetch on page load
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://localhost:7248/User/all2', {
                method: 'GET',
                headers: { "Content-type": "application/json" },
                credentials: 'include',
            });

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7248/User/add', {
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
            fetchUsers();
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
                <h2 className="text-3xl font-bold mb-6 text-gray-700">Create User</h2>

                <div className="space-y-4">
                    <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="Email" value={newUser.Email} onChange={handleInputChange} placeholder="Email" />
                    <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" name="Password" value={newUser.Password} onChange={handleInputChange} placeholder="Password" />
                    <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="FullName" value={newUser.FullName} onChange={handleInputChange} placeholder="Full Name" />
                    <input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="Genre" value={newUser.Genre} onChange={handleInputChange} placeholder="Genre" />
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
                <button onClick={handleAddUser} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">Add user</button>
            </div>
            <div className="max-w-2xl mx-auto my-8">
                <h2 className="text-xl font-bold text-gray-700 mb-4">User List</h2>
                <div className="max-w-4xl mx-auto my-8 overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border-b border-gray-300">Email</th>
                                <th className="px-4 py-2 border-b border-gray-300">Full Name</th>
                                <th className="px-4 py-2 border-b border-gray-300">Age</th>
                                <th className="px-4 py-2 border-b border-gray-300">Genre</th>
                                <th className="px-4 py-2 border-b border-gray-300">Adresse</th>
                                <th className="px-4 py-2 border-b border-gray-300">Antécédents</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border-b border-gray-300">{user.email}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{user.fullName}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{user.age}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{user.genre}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{user.adresse}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{user.antecedents}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <Footer />
        </>

    );
};

export default UserCrud;
