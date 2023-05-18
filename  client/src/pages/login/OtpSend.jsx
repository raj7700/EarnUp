import React, { useEffect, useState } from "react";
import "./OtpSend.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import axios from "axios";

function Login() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      const res = await newRequest.post("/auth/otpSend", {phone});
      navigate("/OtpVerify", { state: phone });
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Phone</label>
        <input
          name="phone"
          type="text"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
          <button type="submit">SendOtp</button>
        <Link to="/login" className="link">
          <p>Login using Username and Password</p>
        </Link>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
