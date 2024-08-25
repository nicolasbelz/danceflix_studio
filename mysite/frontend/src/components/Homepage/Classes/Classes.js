import React from 'react'
import { Section, Back, Image, Text } from './Classes.styled'

const Classes = ({mobile}) => {
  return (
    <Section>
        <Back />
        {!mobile && <Image />}
        <Text>
            <h1>Oglądaj wszędzie.</h1>
            <p>Mamy dla was przygotowany całoroczny program nauczania tańca skierowany do dzieci. Oglądaj lekcje, powtórki, testy z tańców oraz niespodzanki. Nielimitowany dostęp do każdej lekcji...Bez dodatkowych opłat</p>
        </Text>
    </Section>
  )
}

export default Classes