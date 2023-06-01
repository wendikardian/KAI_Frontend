/* eslint-disable react/jsx-no-target-blank */
import LandingPage from './LandingPage/LandingPage'
import './App.css'
import Login from './LandingPage/Login'
import Register from './LandingPage/Register'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './component/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={LandingPage} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/home" Component={Navbar} />

    </Routes>
    </Router>
  )
}

export default App
