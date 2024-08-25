import React from 'react'
import { SettingsComponent } from './UserPage.styled'
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form"
import { changePassword } from '../../services/services';
import { useAuthHeader } from 'react-auth-kit';


const Settings = ({ currentSubscription }) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const alert = useAlert();
  const authHeader = useAuthHeader();


  const onSubmitChangePassword = async data => {
    changePassword(authHeader(), data)
      .then(response => response.json())
      .then(data => {
        if (data.detail) {
          alert.success(data.detail);
          return
        };

        const keys = Object.keys(data);
        for (let i=0; i < keys.length; ++i) {
          for (let j=0; j < data[keys[i]].length; ++j) {
            alert.info(data[keys[i]][j]);
          }
        }
      })
    reset();
  }


  return (
    <SettingsComponent>
      <h1 className='header'>Ustawienia</h1>
      <h3 className='change-pass-title'>Zmiana hasła</h3>
      <form className="change_password" onSubmit={handleSubmit(onSubmitChangePassword)}>
        <div className='input'>
          <label for="new_password1">Nowe hasło</label>
          <input
              {...register("new_password1", { required: true })}
              type="password"
              placeholder='*********'
          />
        </div>
        <div className='input'>
          <label for="new_password2">Powtórz nowe hasło</label>
          <input
              {...register("new_password2", { required: true })}
              type="password"
              placeholder='*********'
          />
        </div>
        <div className='input'>
          <label for="oldPassword">Poprzednie hasło</label>
          <input
              {...register("oldPassword", { required: true })}
              type="password"
              placeholder='*********'
          />
        </div>
        <button>Zatwierdź</button>
      </form>
      { currentSubscription.paid && (
        <div className='renewal'>
          <h3>Automatyczne odnawianie subskrypcji</h3>
          <input type="checkbox" id="renewal"/>
          <button onClick={() => console.log("hello")}>Zatwierdź</button>
        </div>
      )}
    </SettingsComponent>
  )
}

export default Settings