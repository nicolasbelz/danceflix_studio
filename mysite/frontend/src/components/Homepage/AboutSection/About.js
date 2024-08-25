import React, { useEffect, useState } from 'react'
import { Section, Header, Content, Text, Video} from './About.styled'
import { getHomepageVideo } from '../../../services/services'


const About = () => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        getHomepageVideo()
            .then(response => response.json())
            .then(data => setUrl(data.embed))
            .catch((e) => console.log(e))
    }, [])

  return (
    <Section>
        <Header>
            <h1>O nas</h1>
        </Header>
        <Content>
            <Text>
                <p>
                    <a>Internetowe Centrum Tanca i Rekreacji</a>. Powstaliśmy w wyniku połączenia pasji do tańca, wieloletniego doświadczenia w nauczaniu oraz innowacyjnego systemu prowadzenia zajęć internetowych.
                </p>
            </Text>
            <Video>
                <iframe src={url} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen />
            </Video>
        </Content>
    </Section>
  )
}

export default About