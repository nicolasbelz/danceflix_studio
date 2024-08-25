import React, {useEffect, useState} from 'react'
import { Content } from './Class.styled'
import { getVideo } from '../../services/services'
import { useParams } from 'react-router-dom';
import {useAuthHeader} from 'react-auth-kit'


const Class = () => {
  const { resource_key } = useParams();
  const [ embed, setEmbed ] = useState("");
  const authHeader = useAuthHeader();

  useEffect(() => {
    
    getVideo(resource_key, authHeader()).then(data => {
      setEmbed(data.embed);
    });

  }, [])

  return (
      <Content>
      <iframe 
          src={embed}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen title="Santa Claus" />
      </Content>
  )
}

export default Class