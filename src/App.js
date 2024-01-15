import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPanel from './pages/UserPanel'
import CreateRDV from './pages/CreateRDV';
import ConsulterRDVs from './pages/ConsulterRDVs';
import DoctorPanel from './pages/DoctorPanel';
import ConsulterRDVsMedecin from './pages/ConsulterRDVsMedecin';
import DossierMedical from './pages/DossierMedical';
import PageDossier from './pages/PageDossier';
import CreatePrescription from './pages/CreatePrescription';
import CreateExamen from './pages/CreateExamen';
import Traitements from './pages/Traitements';
import UserCrud from './pages/UserCrud';
import UserUpdate from './pages/UserUpdate';
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
        <Route path="/user-panel/traitements" Component={Traitements} />
        <Route path="/doctor-panel" Component={DoctorPanel} />
        <Route path="/doctor-panel/rdvs" Component={ConsulterRDVsMedecin} />
        <Route path="/doctor-panel/dossier" Component={DossierMedical} />
        <Route path="/dossiermedical/:id" Component={PageDossier} />
        <Route path='/create-prescription/:id' Component={CreatePrescription} />
        <Route path='/create-examen/:id' Component={CreateExamen} />
        <Route path='/admin-panel' Component={UserCrud} />
        <Route path='/admin-panel/update/:id' Component={UserUpdate} />
      </Routes>
    </Router>
  );
}

export default App;
