import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { createENDPOINT, ENDPOINTS } from "../endpoints/Endpoints";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        payload: {
          "email": email,
          "password": password,
        }
      };

      const response = await createENDPOINT(ENDPOINTS.AUTH.CUSTOMER.LOGIN).post(payload);
      
      if (!response || response.status !== 200) {
        throw new Error(response.error);
      }

      const accessToken = response.data;
      localStorage.setItem("accessToken", accessToken);
      
      alert("Login Successful");
      navigate('/dashboard');
    } catch (error) {
      alert("Error: " + error.message);
      return;
    }
  };

  return (
    <>
    <NavBar />
    <div className="login-container">
      <h2>Login</h2>
      <p>Log in with Customer credentials</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default Login;