import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";

const DoctorPanel = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userLoggedIn = token ? true : false;
    const decoded = token ? jwtDecode(token) : '';
    // Use useEffect to handle the navigation
    useEffect(() => {
        if (decoded.Type !== 'Medecin') {
            navigate("/login");
        }
    }, [userLoggedIn, navigate]); // Add dependencies here

    return (
        <>
            <Header />
            <div className="p-4 flex flex-col min-h-screen">
                {/* Container for cards */}
                <div className="flex flex-wrap gap-4 ">
                    {/* Card 1 */}
                    <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src="rdv.png" alt="Image description" className="w-full h-32 sm:h-48 object-cover" />
                        <div className="p-4">
                            <Link to="/doctor-panel/rdvs" className="text-blue-500 block">Consulter les RDVs</Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src="dossier.png" alt="Image description" className="w-full h-32 sm:h-48 object-cover" />
                        <div className="p-4">
                            <Link to="/doctor-panel/dossier" className="text-blue-500 block">Consulter les dossiers médicaux</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

}
export default DoctorPanel;