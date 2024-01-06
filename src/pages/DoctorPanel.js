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
                <p class="flex gap-4">
                    <Link to="/doctor-panel/rdvs" class="text-blue-500">Consulter les RDVs</Link>
                    <Link to="/doctor-panel/create" class="text-blue-500">Gérer les dossiers médicaux</Link>
                    <Link to="/doctor-panel/dossier" class="text-blue-500">Consulter les dossiers</Link>
                </p>
            </div>
            <Footer />
        </>
    );
}
export default DoctorPanel;