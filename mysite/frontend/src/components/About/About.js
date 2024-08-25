import React from 'react'
import { Baner, Section, Team, Card } from './About.styled'


const About = () => {
  return (
    <>
        <Baner>
            <h1>Nadszedł czas zabawy z <a style={{color: "#ff66a3"}}>Internetowym Centrum Tańca!</a></h1>
        </Baner>
        <Section imagePosition={"left"}>
            <div className='content'>
                <div className='image' />
                <span>
                    <h1>Nasza misja</h1>
                    <p>Naszą misją jest szerzenie i rozwijanie pasji do tańca wśród dzieci, poprzez udostępnianie prostych, a zarazem atrakcyjnych choreografii. Wraz ze współpracą Małopolskiego Centrum Tańca, które tworzą osoby z wieloletnim doświadczeniem w nauczaniu tańca, pragniemy przekazać Wam dostęp do lekcji tańca online. Lekcji, która jest prowadzona w sposób przystępny dla dzieci w wieku przedszkolnym i wczesnoszkolnym. Ponieważ w MCT instruktorzy tańca to prawdziwi pasjonaci i profesjonaliści w swej dziedzinie, mamy pewność, że udostępnione filmy będą na jak najwyższym poziomie, i co najważniejsze, ćwiczenia i układy przekazane będą w prosty i atrakcyjny sposób.</p>
                </span>
            </div>
        </Section>
        <Section color="white" backgroundColor="#ff66a3" imagePosition={"right"}>
            <div className='content'>
                <span>
                    <h1>Dlaczego warto z nami tańczyć?</h1>
                    <p>Wiadomo nie od dziś, że nauka tańca rozwija pamięć ruchową, koordynację i wspomaga rozwój psychomotoryczny, a do tego może sprawiać ogromną radość i satysfakcję. Dlatego zależy nam, aby radość, którą można czerpać z tańca, można było szerzyć w placówkach takich jak przedszkola i szkoły, bez bariery odległości i dystansu. Dzięki przekazowi online, możemy być z Wami bez względu na to, gdzie jesteście! Wystarczy jedno kliknięcie, a instruktorzy wprowadzą Was w świat tańca i ruchu. Czegoś takiego jeszcze nie było!</p>
                </span>
                <div className='image' />
            </div>
        </Section>
        <Section imagePosition={"left"}>
            <div className='content'>
                <div className='image' />
                <span>
                    <h1>MCT</h1>
                    <p>Zajęcia prowadzone są przez doświadczonych instruktorów tańca, którzy na co dzień pracują w Małopolskim Centrum Tańca oraz w placówkach przedszkolnych, prowadząc zajęcia dla najmłodszych już od wielu, wielu lat. Doświadczenie w pracy z dziećmi w nauczaniu tańca sprawia, że szkoła MCT jest jedną z najbardziej znanych i cenionych szkół tańca w południowej części Polski. Co roku, na zajęcia do MCT uczęszcza około 800 dzieci. Ponadto, MCT specjalizując się także w nauczaniu tańca sportowego, może poszczycić się wieloma tytułami mistrzów tańca zdobytymi w licznych turniejach, przez podopiecznych. Więcej informacji o Małopolskim Centrum Tańca tutaj oraz na naszym Facebooku</p>
                </span>
            </div>
        </Section>
        <Team>
            <Card image="lukasz-wozniak">
                <div className='image'/>
                <h3>Łukasz Woźniak</h3>
                <p>Pomysłodawca i założyciel MCT. Wieloletni, doświadczony trener tańca. Wspaniałe podejście do dzieci gwarantuje, że zajęcia z Łukaszem są dla dzieci niezwykłą, taneczną przygodą. Miłość do tańca, wspaniałe poczucie humoru (uwielbiane przez dzieci!) oraz umiejętność tworzenia wyjątkowej atmosfery sprawia, że zajęcia z Łukaszem są najbardziej lubianymi zajęciami w szkole. Ponadto warto wspomnieć, że jego wychowankowie zdobywali liczne tytuły między innymi kilkunastokrotni Mistrzowie Okręgu Małopolskiego, Mistrzowie Polski, a nawet Mistrzowie Świata.</p>
            </Card>
            <Card image="dominika-dobranowska">
                <div className='image'/>
                <h3>Dominika Dobranowska</h3>
                <p>Aktywna tancerka tańca towarzyskiego, zarówno w stylu standardowym jak i latynoamerykańskim. Dyplomowany instruktor sportu – specjalizacja taniec sportowy. Podczas studiów o kierunku Terapia Zajęciowa – Wydział Rehabilitacji AWF Kraków – również stara się wplatać taniec jako rodzaj terapii – zarówno z osobami sprawnymi fizycznie, ale także z osobami niepełnosprawnymi.</p>
            </Card>
            <Card image="emilia-jarecka">
                <div className='image'/>
                <h3>Emilia Jarecka</h3>
                <p>Swoją karierę taneczną zaczęła w wieku 8 lat w Małopolskim Centrum Tańca. Emilia osiągnęła klasę taneczną A w stylu latynoamerykańskim i standardowym. Emilia jest zawsze uśmiechnięta i pełna optymizmu, a swoją pasją do tańca zaraża wszystkich dookoła.</p>
            </Card>
            <Card image="klaudia-jagielska">
                <div className='image'/>
                <h3>Klaudia Jagielska</h3>
                <p>Z tańcem towarzyskim związana jest od 6 roku życia. Miłość do tańca, która narodziła się od najmłodszych lat, stała się jej pasją i sposobem na życie. Od kilku lat jest instruktorką tańca towarzyskiego, a swoje doświadczenie nabywa poprzez pracę z dziećmi w szkołach i przedszkolach, trenując profesjonalne pary turniejowe oraz pracę z dorosłymi kursantami.</p>
            </Card>
        </Team>
    </>
  )
}

export default About