import React, { useState, useRef, useEffect } from 'react'
import { Logo, Nav, UserButton, UserInfo } from "./Navbar.styled"
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from "react-spring"
import { useSignOut } from 'react-auth-kit'
import { useAlert } from 'react-alert';

const Navbar = ({ color, user }) => {

  const [showUser, setShowUser] = useState(false);
  const signOut = useSignOut();
  const [width, setWidth] = useState(0);
  const componentRef = useRef();
  const navigate = useNavigate();
  const alert = useAlert();

  const styles = useSpring(showUser ? {
    height: "177px",
  } : {
    height: "0",
  }
  )

  useEffect(() => {
    setWidth(componentRef.current ? componentRef.current.offsetWidth : 0);
  }, [componentRef.current]);

  const handleClick = () => {
    setShowUser(!showUser)
  }

  const handleLogout = () => {
    signOut();
    window.location = "/";
    alert.success("Pomyslnie wylogowano!");
  }

  return (
    <Nav color={color}>
        <Logo href="/" />
        <div className='nav-items'>
          <a href="/" >
            Strona Główna
            <hr />
          </a>
          <a href="/offers" >
            Oferty
            <hr />
          </a>
          <a href="/classes" >
            Nasze Zajęcia
            <hr />
          </a>
          <a href="/about" >
            O nas
            <hr />
          </a>
          {
            user ? (
            <UserInfo width={width} showUser={showUser}>
              <UserButton ref={componentRef} showUser={showUser} onClick={handleClick} >{user.first_name} {user.last_name}</UserButton>
              <animated.div style={styles} className='content'>
                <a href="/user">Moje konto</a>
                <a onClick={handleLogout}>Wyloguj</a>
              </animated.div>
            </UserInfo>
            ) :
            (
              <a href="/login" className='login-button'>Zaloguj</a>
            )
        }
      </div>
    </Nav>
  )
}

export default Navbar