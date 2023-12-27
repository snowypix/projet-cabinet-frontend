// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="flex justify-between items-center">
                <Link to="/" rel="noreferrer">
                    <img src="/logo.png" alt="Doctor's Office Logo" className="h-14" />
                </Link>
                <nav className="bg-blue-600 text-white p-4 shadow-md rounded">
                    <ul className="flex">
                        <li><Link to="/login" className="hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">Login</Link></li>
                        <li><Link to="/register" className="hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">Registration</Link></li>
                        <li><Link to="/doctor-panel" className="hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">Doctor Panel</Link></li>
                        <li><Link to="/user-panel" className="hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">User Panel</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
