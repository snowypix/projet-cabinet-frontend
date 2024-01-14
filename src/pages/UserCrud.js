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
        Adresse: ''
        // Add other properties as needed
    });

    useEffect(() => {
        // Fetch on page load
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
            const response = await fetch('https://localhost:7248/User/all', {
                method: 'GET',
                headers: { "Content-type": "application/json" },
                credentials: 'include',
            });

            const data = await response.json();
            setUsers(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleAddUser = async (e) =>
    {
        e.preventDefault();
        try {
            await fetch('https://localhost:7248/User/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            })
                .then((response) => response.json())
                .then((data) => console.log('Success:', data))
                .catch((error) => console.error('Error:', error));
    
            // Reset the form and fetch updated user list
            setNewUser({
                Email: '',
                Password: '',
                FullName: '',
                Genre: '',
                Age: 0,
                Adresse: '',
                // Add other properties as needed
            });
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    };
    

    return (
        <>
            <HeaderAdmin />
            <div>
                <h2>Create User</h2>
                <input type="text" name="Email" value={newUser.Email} onChange={handleInputChange} placeholder="Email" />
                <input type="password" name="Password" value={newUser.Password} onChange={handleInputChange} placeholder="Password" />
                <input type="text" name="FullName" value={newUser.FullName} onChange={handleInputChange} placeholder="Full Name" />
                <input type="text" name="Genre" value={newUser.Genre} onChange={handleInputChange} placeholder="Genre" />
                <input type="number" name="Age" value={newUser.Age} onChange={handleInputChange} placeholder="Age" />
                <input type="text" name="Adresse" value={newUser.Adresse} onChange={handleInputChange} placeholder="Adresse" />
                <button onClick={handleAddUser} className="bg-red text-black hover:bg-gray-200 p-2 rounded transition duration-300 mx-2">
                    Add user
                </button>
            </div>
            <div> <br/>
                <h2>User List</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
Email: {user.email}, {'\u00A0'}{'\u00A0'} Full Name: {user.fullName}, {'\u00A0'}{'\u00A0'} Age: {user.age}, {'\u00A0'}{'\u00A0'} Genre: {user.genre}, {'\u00A0'}{'\u00A0'} Adresse: {user.adresse}. {/* Add other properties as needed */}
                        </li>
                    ))}
                </ul>
            </div> <br/>
            <Footer />
        </>
    );
};

export default UserCrud;
