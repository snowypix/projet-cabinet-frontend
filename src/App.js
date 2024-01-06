import { BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPanel from './pages/UserPanel'
import CreateRDV from './pages/CreateRDV';
import ConsulterRDVs from './pages/ConsulterRDVs';
import DoctorPanel from './pages/DoctorPanel';
import ConsulterRDVsMedecin from './pages/ConsulterRDVsMedecin';
import DossierMedical from './pages/DossierMedical';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/user-panel" Component={UserPanel} />
        <Route path="/user-panel/create" Component={CreateRDV} />
        <Route path="/user-panel/rdvs" Component={ConsulterRDVs} />
        <Route path="/doctor-panel" Component={DoctorPanel} />
        <Route path="/doctor-panel/rdvs" Component={ConsulterRDVsMedecin} />
        <Route path="/doctor-panel/dossier" Component={DossierMedical} />
      </Routes>
    </Router>
  );
}

export default App;
