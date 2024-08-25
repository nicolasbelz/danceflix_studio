import React, { useState, useEffect } from 'react'
import { Baner, Content, Container, Wrap, Card } from './NewClasses.styled'
import { getVideos } from '../../../services/services'
import { AiFillPlayCircle } from "react-icons/ai"
import { Section, Header, Text, Video} from '../../Homepage/AboutSection/About.styled'


// netflix harder version
// const NewClasses = ({ movie, onClick }) => {
//   return (
//     <Content>
//       <h1>Nowe Lekcje 2023</h1>
//       <Container>
//       <h2>lekcje</h2>
//         {/* <div onClick={onClick} className="movie-card">
//           <img src={movie.poster} alt={movie.title} />
//           <div className="movie-description">
//             <h2>{movie.title}</h2>
//             <p>{movie.description}</p>
//             <button>Watch Now</button>
//           </div>
//         </div> */}
//       </Container>
//     </Content>


//   );
// }

// export default NewClasses;



const NewClasses = () => {

  return (
    <>
        {/* New components in Neflix style */}
        <Content>
          <h1>Nowe lekcje 2023</h1>
          <Container>
            <Wrap>
              <img src="../../../static/images/hiphop.jpg" />
            </Wrap>
            <Wrap>
              <img src="../../../static/images/hiphop.jpg" />
            </Wrap>
            <Wrap>
              <img src="../../../static/images/hiphop.jpg" />
            </Wrap>
            <Wrap>
              <img src="../../../static/images/hiphop.jpg" />
            </Wrap>
          </Container>
        </Content>

        <Content>
          <h1>Tańce Ludowe</h1>
          <Container>
            <Wrap>
              <img src="../../../static/images/hiphop.jpg" />
            </Wrap>
            <Wrap>
              <img src="../../../static/images/hiphop.jpg" />
            </Wrap>
            <Wrap>
              <img src="../../../static/images/hiphop.jpg" />
            </Wrap>
            <Wrap>
              <img src="../../../static/images/hiphop.jpg" />
            </Wrap>
          </Container>
        </Content>
    </>
  )

}

export default NewClasses