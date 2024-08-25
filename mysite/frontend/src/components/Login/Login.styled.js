import styled from "styled-components"


export const Background = styled.div`
    width: 100%;
    height: 900px;
    background-image: url('../../../static/images/LoginPage.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
`

export const LoginForm = styled.form`
    height: 50%;
    width: 40%;
    margin: auto;
    background-color: white;
    border-radius: 20px;
    box-shadow: 4px 4px 20px black;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 800px) {
        width: 60%;
        height: 60%;
    }

    & h1 {
        color: #e7016e;
        font-size: 40px;
        text-align: center;
    }
    
    & input {
        width: 50%;
        height: 40px;
        margin-top: 20px;
        border: none;
        border-bottom: 1px solid #e7016e;
        font-size: 20px;
        transition: all 0.5s ease-in-out;
    }

    & label {
        color: black;
        font-size: 15px;
    }

    & input:focus {
        border-bottom: 2px solid #e7016e;
    }

    & button {
        margin-top: 30px;
        padding: 10px 30px 10px 30px;
        border: none;
        background-color: #e7016e;
        color: white;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
        border: 1px solid #e7016e;
    }

    & button:hover {
        color: #e7016e;
        background-color: white;
    }

    & a {
        color: #e7016e;
        margin-top: 15px;
        font-size: 15px;
    }

`