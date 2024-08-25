import React from 'react'
import { Background, LoginForm } from "./Login.styled"
import { useForm } from "react-hook-form";
import { useAlert } from 'react-alert';
import { useSignIn } from 'react-auth-kit'
import axios from 'axios'


const Login = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const alert = useAlert();
  const signIn = useSignIn();


  const onSubmit = async data => {
    // console.log(data);
    reset();
    axios.post('/auth/login/', data)
            .then((res)=>{
                if(res.status === 200){
                    if(signIn({token: res.data.access_token,
                               expiresIn: 60,
                               tokenType: "Bearer",
                               authState: res.data.user,
                               refreshToken: res.data.refresh_token,                    // Only if you are using refreshToken feature
                            })){ // Only if you are using refreshToken feature
                        // Redirect or do-something
                        window.location = "/";
                    } else {
                        //Throw error
                        console.log(res)
                        alert.error("Nieprawidłowy email lub hasło. Spróbuj ponownie.")
                    }
                } 
            }).catch((e) => {
                console.log(e)
                alert.error("Nieprawidłowy email lub hasło. Spróbuj ponownie.")
            })
  }

  return (
      <Background>
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
              <h1>Zaloguj się</h1>
              <input
                  {...register("email", { required: true })}
                  type="text"
                  placeholder='example@email.com'
              />
              <label for="email">email</label>
              <input
                  {...register("password", { required: true })}
                  placeholder='******'
                  type="password"
              />
              <label for="password">hasło</label>
              <button>Zaloguj</button>
              <a>Nie masz jeszcze konta? <a href="/register">Zarejestruj się.</a></a>
          </LoginForm>
      </Background>
  )
}

export default Login