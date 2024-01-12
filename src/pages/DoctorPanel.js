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
            <div class="p-4">
                {/* Container for cards */}
                <div class="flex flex-wrap gap-4">
                    {/* Card 1 */}
                    <div class="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src="rdv.png" alt="Image description" class="w-full h-32 sm:h-48 object-cover" />
                        <div class="p-4">
                            <Link to="/doctor-panel/rdvs" class="text-blue-500 block">Consulter les RDVs</Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div class="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src="dossier.png" alt="Image description" class="w-full h-32 sm:h-48 object-cover" />
                        <div class="p-4">
                            <Link to="/doctor-panel/dossier" class="text-blue-500 block">Consulter les dossiers médicaux</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

}
export default DoctorPanel;