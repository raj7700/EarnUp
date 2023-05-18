import React, { useEffect, useState } from "react";
import "./OtpSend.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Login() {
  
    const location = useLocation();
    const phone = location.state;
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      const res = await newRequest.post("/auth/otpVerify", { phone, otp });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
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
          name=""
          type="text"
          value={phone}
          placeholder="Phone"
          style={{ backgroundColor: "#D3D3D3" }}
        />
        <label htmlFor="">OTP</label>
        <input
          name="OTP"
          type="text"
          value={otp}
          placeholder="Phone"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">VerifyOTP</button>
        <Link to="/login" className="link">
          <p>Login using Username and Password</p>
        </Link>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
