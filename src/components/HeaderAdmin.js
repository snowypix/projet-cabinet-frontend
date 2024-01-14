// Header.js
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decoded = token ? jwtDecode(token) : '';
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <header className="bg-red-500 text-white p-4"> {/* Changed bg-blue-500 to bg-red-500 */}
            <div className="flex justify-between items-center">
                <Link to="/" rel="noreferrer">
                    <img src="/logo.png" alt="Doctor's Office Logo" className="h-14" />
                </Link>
                <nav>
                    <ul className="flex items-center gap-2"> {/* Added items-center to align the items vertically */}
                    {decoded.Type && (
                        <li>
                            <button onClick={logout} className="bg-white text-black hover:bg-gray-200 p-2 rounded transition duration-300 mx-2"> {/* Added bg-white and text-black classes */}
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

export default HeaderAdmin;