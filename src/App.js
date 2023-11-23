import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Update from "./components/Update";
import CreateTeam from "./components/CreateTeam";
import ShowTeams from "./components/ShowTeams";
function App() {
  return (
    <div className="container mx-auto  p-3">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Card></Card>}></Route>
          <Route path="/createuser" element={<Create></Create>}></Route>

          <Route path="/createteam" element={<CreateTeam></CreateTeam>}></Route>
          <Route path="/update/:id" element={<Update></Update>}></Route>
          <Route path="/showteams" element={<ShowTeams></ShowTeams>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
