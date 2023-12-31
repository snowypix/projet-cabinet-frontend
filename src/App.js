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
      </Routes>
    </Router>
  );
}

export default App;
