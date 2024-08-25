import React, { useState, useEffect } from 'react'
import NewClasses from './NewClasses/NewClasses'
import OldClasses from './OldClasses/OldClasses'
import { Baner, Content, Videos, Container, Container2, Wrap, Card } from './Classes.styled'
import { getVideos } from '../../services/services'
import { AiFillPlayCircle } from "react-icons/ai"


const Classes = () => {

  // const movie = {
  //   title: 'The Shawshank Redemption',
  //   poster: 'img src="../../../static/images/hiphop.jpg',
  //   description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  // };

  // const handleClick = () => {
  //   // Do something when the movie card is clicked
  // };



  return (
    <>
        <Baner>
            <h1>Zobacz jak wyglądają nasze <a style={{color: '#e7016e'}}>zajęcia</a>.</h1>
        </Baner>
        <NewClasses />
        <OldClasses />
    </>
  )
}

export default Classes