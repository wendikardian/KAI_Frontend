/* eslint-disable react/jsx-no-target-blank */
import LandingPage from './LandingPage/LandingPage'
import './App.css'
import Login from './LandingPage/Login'
import Register from './LandingPage/Register'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from './component/Navbar';
import Schedule from './screens/Schedule';
import FindTicket from './screens/FindTicket';
import MyTicket from './screens/MyTicket';
import Station from './screens/Station';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={LandingPage} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/schedule" Component={Schedule} />
        <Route exact path="/find_ticket" Component={FindTicket} />
        <Route exact path="/my_ticket" Component={MyTicket} />
        <Route exact path="/station" Component={Station} />

    </Routes>
    </Router>
  )
}

export default App
