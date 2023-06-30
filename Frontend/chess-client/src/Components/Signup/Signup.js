import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [imageUrls, setImageUrls] = useState("");
  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const handleSignup = async () => {
    const res = await axios.post(`http://localhost:3500/signup`, {
      username: username,
      email: email,
      password: password,
      profilepic:
        imageUrls === ""
          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
          : imageUrls,
    });
    const data = await res.data;
    return data;
  };
  const handleUpload = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      const allowedFormats = ["png", "jpg", "jpeg"];
      const fileType = file.name.split(".").pop().toLowerCase();
      data.append("my_file", file);
      if (allowedFormats.includes(fileType)) {
        const response = await axios.post("http://localhost:3500/upload", data);
        setRes(response.data);
        setImageUrls(response.data.url);
      } else {
        alert("Please select a PNG, JPG, or JPEG file.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
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
      <div className="App">
        <h5>Select Profile Picture below:</h5>
        {file && <center>{file.name}</center>}
        <input
          id="file"
          type="file"
          onChange={handleSelectFile}
          multiple={false}
        />
        {file && (
          <div className="button-container">
            <Button
              variant="contained"
              onClick={handleUpload}
              className="btn-green"
            >
              {loading ? "Uploading" : "Set Profile Picture"}
            </Button>
            <div className="done">
              {imageUrls === "" ? "No image uploaded" : "Done!"}
            </div>
          </div>
        )}
      </div>
      <Button
        disabled={checkDisabled()}
        variant="contained"
        color="success"
        onClick={async () => {
          await handleSignup()
            .then(() => {
              navigate("/chess");
            })
            .catch(() => {
              setEmail("");
              setPassword("");
              setUsername("");
              toast.error("Signup Failed!");
            });
        }}
      >
        Signup
      </Button>
      <Toaster position="top-right" />
      <Link to="/login">Have an Account? Login Instead</Link>
    </div>
  );
}

export default Signup;
