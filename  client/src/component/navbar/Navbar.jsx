import React from 'react'
import "./Navbar.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import person from "../../assets/person.png"
import newRequest from '../../utils/newRequest';


 const Navbar = () => {
  const [active,setActive] = useState(false);
  const [open,setOpen] = useState(false)
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const isActive = () =>{
    window.scrollY > 0 ? setActive(true) : setActive(false);
  }
    const currentUser=JSON.parse(localStorage.getItem("currentUser"));

  useEffect(()=>
  {
    window.addEventListener("scroll",isActive)
    return () =>
    {
      window.removeEventListener("scroll",isActive);
    }
  })
  const handleLogout = async() => {
    try{
     await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser",null);
      navigate("/")
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            {active || pathname !== "/" ? (
              <span style={{ color: "black" }}>EarnUp</span>
            ) : (
              <span className="text">EarnUp</span>
            )}
          </Link>
          <span className="dot">!!</span>
        </div>
        <div className="links">
          <span>EarnUp Business</span>
          <span>Explore</span>
          <span>English</span>
          <Link to="/login" className='link'>Sign In</Link>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (
            <Link className="link" to="register">
              <button>Join</button>
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || person} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link" to="mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              Graphics & Design
            </Link>
            <Link className="link" to="/">
              Video & Animation
            </Link>
            <Link className="link" to="/">
              Writing & Translation
            </Link>
            <Link className="link " to="/">
              AI Services
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
            <Link className="link" to="/">
              Music & Audio
            </Link>
            <Link className="link" to="/">
              Programming & Tech
            </Link>
            <Link className="link" to="/">
              Business
            </Link>
            <Link className="link" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}
export default Navbar;