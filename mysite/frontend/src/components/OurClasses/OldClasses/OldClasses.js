import React, { useEffect, useState } from 'react'
import { Content, Videos, Card } from './OldClasses.styled'
import { getVideos } from '../../../services/services'
import { AiFillPlayCircle } from "react-icons/ai"


const OldClasses = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos().then(data => setVideos(data));
  }, [])

  const VideoCard = ({name, resource_key, description}) => {
    return (
      <Card>
        <div>
          <a className='play-icon' href={`/class/${resource_key}`} ><AiFillPlayCircle size={100} color="white"/></a>
        </div>
        <span>
          <h2>{name}</h2>
          <p>{description}</p>
        </span>
      </Card>
    )
  }

  return (
    <>        
        <Content>
            <h1>Nasze lekcje</h1>
            <Videos>
              {
                videos.map(item => (
                  <VideoCard name={item.name} resource_key={item.resource_key} description={item.description} />
                ))
              }
            </Videos>
        </Content>
    </>
  )

}

export default OldClasses