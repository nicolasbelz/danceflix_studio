import React, { useState, useEffect } from 'react'
import { Content } from './UserPage.styled'
import { FaUserAlt, FaHeart } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import Favorites from "./Favorites"
import UserInfo from "./UserInfo"
import Settings from "./Settings"
import { getCurrentSubscription, getLastSubscriptions } from '../../services/services'
import { useAuthHeader } from 'react-auth-kit'


const UserPage = ({user}) => {
  const [page, setPage] = useState("user");
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState({});
  const authHeader = useAuthHeader();

  useEffect(() => {
    getLastSubscriptions(authHeader())
      .then(response => response.json())
      .then(data => setSubscriptions(data));
    
    getCurrentSubscription(authHeader())
      .then(response => response.json())
      .then(data => setCurrentSubscription(data));
  }, []);
  
  return (
    <>
    <div style={{width: "100%", height: "110px"}}/>
    <Content>
      <div className='sidebar'>
        <h3>Panel użytkonika</h3>
        <button onClick={() => setPage("user")}>
          <FaUserAlt className='icon'/> Informacje o użytkowniku
        </button>
        <button onClick={() => setPage("settings")}>
          <IoMdSettings className='icon'/> Ustawienia
        </button>
      </div>
      {page === "user" ? <UserInfo user={user} subscriptions={subscriptions} /> : <Settings currentSubscription={currentSubscription} />}
    </Content>
    </>
  )
}

export default UserPage