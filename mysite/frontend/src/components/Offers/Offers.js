import React, {useEffect, useRef, useState} from 'react'
import { Baner, Content, Content2, Card, SelectCurrency } from './Offers.styled'
import { getOffers } from "../../services/services"


const Offers = ({user}) => {
  const [offers, setOffers] = useState([]);
  const [currency, setCurrency] = useState("zł");
  const myRef = useRef();

  useEffect(() => {
    getOffers().then(data => setOffers(data));
  }, [])

  const handleChangeCurrency = () => {
    setCurrency(myRef.current.value);
  }


  const CardComponent = ({price, duration, days}) => {
    return (
      <Card>
        <h1>{price}<a>/{duration}</a></h1>
        <hr />
        <li>Nielimitowany dostęp do wszystkich lekcji</li>
        <li>Testy i zabawy</li>
        <li>Pakiet dla wielu grup</li>
        <a href={user ? `/checkout/${currency}/${days}` : "/login"} className='offer-button'>Zakup</a>
      </Card>
      
    )
  }

  return (
      <>
        <Baner>
            <h1>Wykup pakiet dostosowany do twoich <a style={{color: '#e7016e'}}>potrzeb</a>!</h1>
        </Baner>
        <SelectCurrency ref={myRef} onChange={handleChangeCurrency}>
          <option>zł</option>
          <option>USD</option>
          <option>EUR</option>
        </SelectCurrency>
        <Content>
            {
              offers.filter(item => item.price.currency === currency).map(item => (
              <CardComponent price={`${item.price.amount} ${item.price.currency}`} days={item.duration.days} duration={item.duration.time} />
              ))
            }
        </Content>
        <Content2>
          <h1>W celu dokonania płatności przelewem prosimy o przesłanie do faktury na nasz adres mailowy</h1>
        </Content2>
      </>
  )
}
export default Offers