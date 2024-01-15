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
                <input
                    type="text"
                    name="Antecedents"
                    value={newUser.Antecedents}
                    onChange={handleInputChange}
                    placeholder="Antecedents"
                />
            );
        } else if (userType === 'Médecin' || userType === 'Infirmier') {
            return (
                <>
                    <input
                        type="time"
                        name="HoraireDebut"
                        value={newUser.HoraireD}
                        onChange={handleInputChange}
                        placeholder="HorarireDebut"
                    />
                    <input
                        type="time"
                        name="HoraireFin"
                        value={newUser.HoraireF}
                        onChange={handleInputChange}
                        placeholder="HorarireFin"
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
            <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create User</h2>

                <input type="text" name="Email" value={newUser.Email} onChange={handleInputChange} placeholder="Email" />
				<input type="password" name="Password" value={newUser.Password} onChange={handleInputChange} placeholder="Password" />
                <input type="text" name="FullName" value={newUser.FullName} onChange={handleInputChange} placeholder="Full Name" />
                <input type="text" name="Genre" value={newUser.Genre} onChange={handleInputChange} placeholder="Genre" />
                <input type="number" name="Age" value={newUser.Age} onChange={handleInputChange} placeholder="Age" />
                <input type="text" name="Adresse" value={newUser.Adresse} onChange={handleInputChange} placeholder="Adresse" />                
                <select className="border p-2 mb-4 w-full rounded" name="UserType" value={newUser.UserType} onChange={handleInputChange}>
                    <option value="Admin">Admin</option>
                    <option value="Patient">Patient</option>
                    <option value="Médecin">Médecin</option>
                    <option value="Infirmier">Infirmier</option>
                </select>

                {renderAdditionalFields()}

                <br /><button onClick={handleAddUser} className="bg-red text-black hover:bg-gray-200 p-2 rounded transition duration-300 mx-2"> Add user </button>
            </div>
            <div>
                <h2>User List</h2>
                <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        Email: {user.email}, {'\u00A0'}{'\u00A0'} Full Name: {user.fullName}, {'\u00A0'}{'\u00A0'} Age: {user.age}, {'\u00A0'}{'\u00A0'} Genre: {user.genre}, {'\u00A0'}{'\u00A0'} Adresse: {user.adresse},{'\u00A0'}{'\u00A0'} Antécédents: {user.antecedents}.
                    </li>
                ))}
                </ul>
            </div> <br />
            <Footer />
        </>
    );
};

export default UserCrud;
