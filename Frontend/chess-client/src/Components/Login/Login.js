import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleLogin = async () => {
    const res = await axios.post("http://localhost:3500/login", {
      username: username,
      email: email,
      password: password,
    });
    const data = await res.data;
    return data;
  };
  const checkDisabled = () => {
    if (username === "" || email === "" || password === "") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="outlined-basic"
        placeholder="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        placeholder="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        placeholder="Passsword"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        disabled={checkDisabled()}
        variant="contained"
        color="success"
        onClick={async () => {
          await handleLogin()
            .then(() => {
              navigate("/chess");
            })
            .catch(() => {
              setEmail("");
              setPassword("");
              setUsername("");
              toast.error("Login Failed!");
            });
        }}
      >
        Login
      </Button>
      <Link to="/">Don't have an Account? Signup Instead</Link>
      <Toaster position="top-right" />
    </div>
  );
}

export default Login;
