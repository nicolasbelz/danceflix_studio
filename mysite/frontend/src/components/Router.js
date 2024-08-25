import React, { useState, useEffect } from 'react'
import Homepage from "./Homepage/Homepage"
import Offers from "./Offers/Offers"
import Classes from "./OurClasses/Classes";
import Class from "./Class/Class"
import Login from "./Login/Login";
import Register from "./Register/Register";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Checkout from "./Checkout/Checkout";
import About from "./About/About"
import UserPage from "./UserPage/UserPage"
import MoviePage from "./MoviePage/MoviePage"
import {
    Routes,
    Route,
} from "react-router-dom";
import { useAuthUser, RequireAuth} from 'react-auth-kit'


const AppRouter = () => {
    const [mobile, setMobile] = useState((window.innerWidth <= 700));
    const [user, setUser] = useState({});
    const auth = useAuthUser();

    const handleResize = () => {
        if (window.innerWidth <= 770) {
            setMobile(true)
        } else {
            setMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        setUser(auth());
    }, []);

    const path = document.location.pathname.split("/")[1];

    return (
        <>
            <Navbar user={user} color={["myvideos", "class", "user"].includes(path) ? "black" : "white"} />
            <Routes>
                <Route exact path="/" element={
                    <Homepage mobile={mobile} />
                } />
                <Route exact path="/offers" element={
                    <Offers user={user} />
                } />
                <Route exact path="/classes" element={
                    <Classes />
                } />
                <Route exact path="/class/:resource_key" element={
                    <Class />
                } />
                <Route exact path="/about" element={
                    <About />
                } />
                <Route exact path="/checkout/:currency/:duration" element={
                    <RequireAuth loginPath={'/login'}>
                        <Checkout />
                    </RequireAuth>
                } />
                <Route exact path="/user" element={
                    <RequireAuth loginPath={'/login'}>
                        <UserPage user={user} />
                    </RequireAuth>
                } />
                <Route exact path="/login" element={
                    <Login />
                } />
                <Route exact path="/register" element={
                    <Register />
                } />
                <Route exact path="moviepage" element={
                    <MoviePage />
                } />
                </Routes>
            <Footer />
        </>
    )
}

export default AppRouter