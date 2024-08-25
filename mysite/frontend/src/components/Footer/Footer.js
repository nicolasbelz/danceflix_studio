import React from 'react'
import { Section, Icons, Columns } from './Footer.styled'
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"


const Footer = () => {
  return (
    <Section>
      <Columns>
        <div>
          <a href='/'>
            Strona Główna
          </a>
        </div>
        <div>
          <a href='/classes'>
            Nasze Zajęcia
          </a>
        </div>
        <div>
          <a href='/'>Kontakt</a>
          <p>
            mail: danceflixpl@gmail.com <br></br>
            telefon: 600 181 594
          </p>
        </div>
        <div>
          <a href='/offers'>
            Oferty
          </a>
        </div>
      </Columns>
      <Icons>
        <FaFacebook size={40} color="white" />
        <FaLinkedin size={40} color="white" />
        <FaTwitter size={40} color="white" />
      </Icons>
    </Section>
  )
}

export default Footer