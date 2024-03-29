import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/>} 
            <Routes>
                {isLoggedIn ? (
                    <>
                    <Route path="/" element={<Home userObj={userObj}/>}/>
                    <Route path="/profile" element={<Profile />}/>
                    </>
                ) : (
                    <Route path="/" element={<Auth/>}/>

                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;