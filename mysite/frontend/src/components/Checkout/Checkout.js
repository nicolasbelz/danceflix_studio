import React, {useState} from 'react'
import { Baner, CheckoutForm } from './Checkout.styled'
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom';
import { sendCheckoutForm } from '../../services/services';
import {useAuthHeader} from 'react-auth-kit';


const Checkout = () => {
  const { currency, duration } = useParams();
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const alert = useAlert();
  const [showInvoice, setShowInvoice] = useState(false);
  const authHeader = useAuthHeader();


  const onSubmit = async data => {
    
    if (!showInvoice & typeof data.nip !== "undefined") {
        delete data.nip;
    }
    data.currency = currency;
    data.duration = duration;
    sendCheckoutForm(authHeader(), data)
        .then((data) => {
            console.log(data);
            if (data.message){
                alert.error(data.message);
                return
            }
            window.location.href = data.url;
        });
    reset();
  }

  const handleInvoice = () => {
    showInvoice && reset({"nip": ""})
    setShowInvoice(!showInvoice);
  }

  return (
    <Baner>
        <CheckoutForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Zakup pakiet!</h1>
            <h4>Pakiet na {duration} dni!</h4>
            <div className='address'>
                <div>
                    <input
                        {...register("first_name", { required: true })}
                        type="text"
                        placeholder='Jan'
                    />
                    <label for="first_name">imię</label>
                </div>
                <div>
                    <input
                        {...register("last_name", { required: true })}
                        placeholder='Kowalski'
                        type="text"
                    />
                    <label for="last_name">nazwisko</label>
                </div>
            </div>
            <div className='address'>
                <div>
                    <input
                        {...register("city", { required: true })}
                        type="text"
                        placeholder='Krakow'
                    />
                    <label for="city">miejscowość</label>
                </div>
                <div>
                    <input
                        {...register("postal_code", { required: true })}
                        placeholder='01-000'
                        type="text"
                    />
                    <label for="postal_code">kod pocztowy</label>
                </div>
            </div>
            <div className='address'>
                <div>
                    <input
                        {...register("address", { required: true })}
                        type="text"
                        placeholder='ul. Nowa 13b'
                    />
                    <label for="address">Adres</label>
                </div>
                <div>
                    <input
                        {...register("phone", { required: true })}
                        placeholder='+48 123 123 123'
                        type="text"
                    />
                    <label for="phone">numer telefonu</label>
                </div>
            </div>
            <button>Zakup</button>
            <div className='checkbox'>
                <input
                    name='invoice'
                    type="checkbox"
                    checked={showInvoice}
                    onChange={handleInvoice}
                />
                <label for="invoice">Faktura</label>
                {showInvoice && (
                    <div className='nip'>
                        <label for="nip">NIP</label>
                        <input
                            {...register("nip", {})}
                            placeholder='123123123'
                            type="text"
                        />
                    </div>
                )}
            </div>
        </CheckoutForm>
    </Baner>
  )
}

export default Checkout