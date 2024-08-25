import React from 'react'
import { Background, RegisterForm } from './Register.styled'
import { useForm } from "react-hook-form";
import { sendRegisterForm } from '../../services/services';
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const alert = useAlert();
  const navigate = useNavigate();

  const onSubmit = async data => {
    sendRegisterForm(data)
      .then(data => {
        if (data.message){
          alert.error(data.message);
          return
        }
        alert.success(data.success);
        navigate("/login");
        reset();
      })
  }

  return (
      <Background>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <h1>Zarejestruj sie</h1>
          <div className='names'>
            <div>
              <input
                  {...register("first_name", { required: true })}
                  type="text"
                  placeholder='John'
              />
              <label for="name">Imie</label>
            </div>

            <div>
              <input
                  {...register("last_name", { required: true })}
                  type="text"
                  placeholder='Smith'
              />
              <label for="lastName">Nazwisko</label>
            </div>

          </div>

          <input
              {...register("email", { required: true })}
              type="text"
              placeholder='example@mail.com'
          />
          <label for="email">email</label>

          <input
              {...register("phone", { required: true })}
              type="text"
              placeholder='123 123 123'
          />
          <label for="phone">telefon</label>

          <input
              {...register("password", { required: true })}
              type="password"
              placeholder='*******'
          />
          <label for="password">haslo</label>

          <input
              {...register("password2", { required: true })}
              type="password"
              placeholder='*******'
          />
          <label for="password2">powtorz haslo</label>

          <button>Zarejestruj</button>
        </RegisterForm>
      </Background>
  )
}

export default Register