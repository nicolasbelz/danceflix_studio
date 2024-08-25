import React from 'react'
import About from './AboutSection/About'
import Features from './Features/Features'
import Classes from './Classes/Classes'
import { HomepageBaner } from './Homepage.styled'
import Faq from './FAQ/Faq'

const Homepage = ({mobile}) => {
  return (
    <>
    <HomepageBaner>
      <h1>Witamy w świecie zajęć tanecznych <a style={{color: '#e7016e'}}>online</a>!</h1>
      <button>Sprawdź już teraz</button>
      <button>
        <a href={`/classes`} className='button'>button</a>
      </button>
    </HomepageBaner>
    <About />
    <Features mobile={mobile}/>
    <Classes mobile={mobile}/>
    <Faq />
    </>
  )
}

export default Homepage


{/* <a href={user ? `/checkout/${currency}/${days}` : "/login"} className='offer-button'>Zakup</a> */}
