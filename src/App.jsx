/* eslint-disable react/jsx-no-target-blank */
import LandingPage from "./LandingPage/LandingPage";
import "./App.css";
import Login from "./LandingPage/Login";
import Register from "./LandingPage/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from './component/Navbar';
import DataProvider from "./Data/DataCtx";
import Schedule from "./screens/Schedule";
import FindTicket from "./screens/FindTicket";
import MyTicket from "./screens/MyTicket";
import Station from "./screens/Station";
import addStation from "./screens/addStation";
import editStation from "./screens/editStation";
import RouteTrain from "./screens/RouteTrain";
import addRoute from "./screens/addRoute";
import addSchedule from "./screens/addSchedule";
import Profile from "./screens/Profile";
import BookTicket from "./screens/BookTicket";
import Payment from "./screens/Payment";

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route exact path="/" Component={LandingPage} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/register" Component={Register} />
          <Route exact path="/profile" Component={Profile} />
          <Route exact path="/schedule" Component={Schedule} />
          <Route exact path="/route_train" Component={RouteTrain} />
          <Route exact path="/find_ticket" Component={FindTicket} />
          <Route exact path="/my_ticket" Component={MyTicket} />
          <Route exact path="/station" Component={Station} />
          <Route exact path="/add_station" Component={addStation} />
          <Route exact path="/add_route" Component={addRoute} />
          {/* add route with params */}
          <Route exact path="/edit_station/:id" Component={editStation} />
          <Route exact path="/add_schedule/:id" Component={addSchedule} />
          <Route exact path="/book_ticket/:id" Component={BookTicket} />
          <Route exact path="/payment/:id" Component={Payment} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
