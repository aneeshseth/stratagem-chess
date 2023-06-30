import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChessBoard from "./Components/ChessBoard/ChessBoard";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Routes>
      <Route exact path="/chess" Component={ChessBoard} />
      <Route exact path="/" Component={Signup} />
      <Route exact path="/login" Component={Login} />
    </Routes>
  );
}

export default App;
