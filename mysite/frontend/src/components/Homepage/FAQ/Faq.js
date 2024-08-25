import React, { useState } from 'react'
import { Section, Cards, Header, CardComponent } from "./Faq.styled"
import { BsArrowLeftCircleFill } from "react-icons/bs"


const Faq = () => {
  
  const items = [
      {
          "id": 1,
          "question": 'Jak przebiega "lekcja online"?',
          "answear": "Nasze zajęcia trwają około 25 minut - dzięki temu, przez cały czas trawania nagrania, możemy utrzymać wysoki poziom skupienia i koncentracji wśród dzieci. W ciągu tych 30 minut w dokładny i prosty sposób pokazujemy jak poprawnie wykonywać poszczególne kroki choreografii, często wzbogacając je o elementy „dialogu” – to wszystko po to, by dzieci wykonujące razem z nami nasze układy, miały wrażenie, że fatycznie zwracamy się do NICH, a nie do pustego ekranu komputera.",
      },
      {
          "id": 2,
          "question": "Kiedy można obejrzeć lekcje?",
          "answear": "Nowe lekcje można obejrzeć o dowolnej porze. Nagranie jest ciągłe – ciągłość zapewnia, że lekcja online, jest jak najbardziej zbliżona do lekcji prowadzonej na żywo.",
      },
      {
          "id": 3,
          "question": "Czy mogę ponownie odtworzyć zajęcia, na przykład dla innej grupy uczestników?",
          "answear": "Tak. Nasze pakiety zapewniają miesięczny nielimitowany dostęp do cotygodniowych lekcji tańca. Przejdź do zakładki oferty aby dowiedzieć się więcej.",
      },
  ]
  const [questions, setQuestions] = useState(items);


  const Card = ({question, ans, id}) => {
      return (
            <CardComponent>
                <div className='header'>
                    <h1>{question}</h1>
                </div>
                <span className='content'>
                    {ans}
                </span>
            </CardComponent>
      )
  }

  return (
    <Section>
        <Header>Najczęściej zadawane pytania</Header>
        <Cards>
            {
            questions.map(item => <Card question={item.question} ans={item.answear} id={item.id} />)
            }
        </Cards>
    </Section>
  )
}

export default Faq
