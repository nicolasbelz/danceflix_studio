import React from 'react'
import { Header, Section, Content, Card, Icon } from "./Features.styled"
import { RiCustomerServiceFill } from "react-icons/ri"
import { ImMusic } from "react-icons/im"
import { AiFillSafetyCertificate } from "react-icons/ai"


const Features = ({ mobile }) => {
  return (
    <Section>
      <Header>
        <h1>Co nas cechuje</h1>
      </Header>
      <Content>
        <Card>
          <Icon><RiCustomerServiceFill color="black" size={mobile ? 20 : 100} /></Icon>
          <h3>Profesjonalna Obsługa</h3>
          <p>Lekcje tańca w najwyższej jakości. Pomoc techniczna w obsłudze naszej strony.</p>
        </Card>
        <Card>
          <Icon><ImMusic color="black" size={mobile ? 20 : 100} /></Icon>
          <h3>Niskie ceny</h3>
          <p>Mnóstwo zabawy i nauki dla dzieci w jednym prostym miejscu.</p>
        </Card>
        <Card>
          <Icon><AiFillSafetyCertificate color="black" size={mobile ? 20 : 100} /></Icon>
          <h3>Wygoda i bezpieczeństwo</h3>
          <p>Możliwość korzystania z naszych zajęć o dowolnej porze. Nieprzerwana nauka tańca i zabawa.</p>
        </Card>
      </Content>
    </Section>
  )
}

export default Features