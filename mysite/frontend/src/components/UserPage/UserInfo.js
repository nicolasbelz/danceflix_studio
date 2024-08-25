import React from 'react'
import { UserInfoComponent } from './UserPage.styled'
import { AiFillCheckCircle } from "react-icons/ai"
import { MdCancel } from "react-icons/md"


const UserInfo = ({ user, subscriptions }) => {
  console.log(subscriptions);
  return (
    <UserInfoComponent>
        <h1 className='header'>{user.first_name} {user.last_name}</h1>
        <h3>Historia subskrypcji</h3>
        <div className='info'>
            {
            subscriptions.length === 0 ? (
                <h3>Nie masz jeszcze zakupionych żadnych subskrypcji.</h3>
            ) : (
            <>
            {subscriptions.map((item) => (
            <div className='card'>
                <h1>{item.subscription_item.price.amount} {item.subscription_item.price.currency}</h1>
                <h4>{item.subscription_item.duration.time}</h4>
                początek: {item.polish_start_date}<br />
                koniec: {item.polish_end_date}<br />
                <div className='icon'>
                    {item.paid ? (
                        <AiFillCheckCircle size={40} color="white" />
                    ) : (
                        <MdCancel size={40} color="white" />
                    )}
                </div>
            </div>
            ))}
            </>
            
            )
            }
        </div>
    </UserInfoComponent>
  )
}

export default UserInfo