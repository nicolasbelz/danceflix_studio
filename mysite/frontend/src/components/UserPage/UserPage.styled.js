import styled from "styled-components"


export const Content = styled.div`
    width: 100%;
    height: 600px;
    display: flex;
    background-color: rgb(240, 240, 240);

    & .sidebar {
        width: 23%;
        height: 100%;
        background-color: rgb(220, 220, 220);
        display: flex;
        flex-direction: column;
    }

    & .sidebar h3{
        text-align: center;
    }

    & .sidebar .icon{
        margin-right: 20px;
        font-size: 25px;
    }

    & .sidebar button {
        width: 100%;
        margin: 20px 0 20px 0;
        padding: 0 20px 0 20px;
        display: flex;
        align-items: center;
        height: 40px;
        background-color: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
        transition: all .3s ease-in-out;
    }

    & .sidebar button:hover {
        border-right: 3px solid #e7016e;
    }
`

export const UserInfoComponent = styled.div`
    width: 77%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & h3 {
        margin-left: 100px;
    }

    & .header {
        margin-left: 70px;
        margin-top: 50px;
        font-size: 50px;
        width: 300px;
        border-bottom: 6px solid #e7016e;
    }

    & .info {
        margin-left: 50px;
        height: 50%;
        width: 90%;
        align-items: center;
        display: flex;
        overflow-x: auto;
    }

    & .card {
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 250px;
        color: white;
        background-color: #e7016e;
        text-align: center;
        border-radius: 20px;
        box-shadow: 2px 2px 10px black;
    }

    & .card h1 {
        width: 100%;
        height: 50px;
        margin: 20px 0 5px 0;
    }

    & .card h4 {
        margin: 5px 0 20px 0;
    }

    & .icon {
        width: 100%;
        margin: 10px 0 10px 0;
    }
`

export const SettingsComponent = styled.div`
    width: 77%;
    display: flex;
    flex-direction: column;
    
    & .change-pass-title {
        margin-left: 60px;
    }

    & .header {
        margin-left: 70px;
        margin-top: 50px;
        font-size: 50px;
        width: 300px;
        border-bottom: 6px solid #e7016e;
    }

    & .input {
        display: flex;
        flex-direction: column;
        margin: 0 20px 0 20px;
    }

    & .change_password {
        margin: 30px 0 0 40px;
        display: flex;
        width: 100%;
        align-items: center;
    }

    & .change_password input {
        height: 30px;
        width: 200px;
    }

    & .change_password button {
        background-color: #e7016e;
        border: none;
        border-radius: 10px;
        border: 1px solid #e7016e;
        color: white;
        cursor: pointer;
        transition: all .4s ease-in-out;
        width: 100px;
        height: 50px;
        margin: 10px 0 0 50px;
    }

    & .change_password button:hover {
        background-color: white;
        color: #e7016e;
    }

    & .renewal {
        margin-left: 40px;
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    & .renewal h3 {
        margin: 70px 0 0 0;
    }
    
    & .renewal input {
        -webkit-appearance:none;
        width:30px;
        height:30px;
        background:white;
        border-radius:5px;
        border:2px solid white;    
        margin: 30px 0 30px 0;
    }
    
    & .renewal button {
        padding: 10px 30px 10px 30px;
    }

    & .renewal input:checked {
        background: #e7016e;
    }

`