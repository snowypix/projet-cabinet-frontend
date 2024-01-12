// Header.js
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decoded = token ? jwtDecode(token) : '';
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="flex justify-between items-center">
                <Link to="/" rel="noreferrer">
                    <img src="/logo.png" alt="Doctor's Office Logo" className="h-14" />
                </Link>
                <nav>
                    <ul className="flex items-center gap-2"> {/* Added items-center to align the items vertically */}
                        {!decoded.Type && (
                            <>
                                <li><Link to="/login" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">Login</Link></li>
                                <li><Link to="/register" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">Registration</Link></li>
                            </>
                        )}
                        {decoded.Type === "Medecin" && (
                            <li><Link to="/doctor-panel" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">Doctor Panel</Link></li>
                        )}
                        {decoded.Type === "Patient" && (
                            <li><Link to="/user-panel" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">User Panel</Link></li>
                        )}
                        {decoded.Type && (
                            <li>
                                <button onClick={logout} className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition duration-300 mx-2">
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
