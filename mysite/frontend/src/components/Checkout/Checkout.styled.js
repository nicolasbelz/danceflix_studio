import styled from "styled-components";


export const Baner = styled.div`
    width: 100%;
    height: 800px;
    background-image: url('../../../static/images/offers.jpg');
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
`

export const CheckoutForm = styled.form`
    height: 70%;
    width: 50%;
    margin: auto;
    background-color: white;
    border-radius: 20px;
    box-shadow: 4px 4px 20px black;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .address {
        width: 80%;
        display: flex;
        justify-content: space-evenly;
    }

    & .address input {
        width: 70%;
    }

    & .address div {
        display: flex;
        flex-direction: column;
        width: 50%;
        justify-content: center;
        align-items: center;
    }

    & input {
        width: 30%;
        height: 40px;
        margin-top: 30px;
        border: none;
        border-bottom: 1px solid #e7016e;
        font-size: 24px;
        transition: all 0.5s ease-in-out;
    }

    & label {
        color: black;
        font-size: 15px;
    }

    & input:focus {
        border-bottom: 2px solid #e7016e;
    }

    & .checkbox {
        display: flex;
        margin-top: 20px;
        width: 50%;
        align-items: center;
    }

    & .checkbox input{
        margin: 0;
        width: 30px;
    }

    & button {
        margin-top: 50px;
        padding: 10px 30px 10px 30px;
        border: none;
        background-color: #e7016e;
        color: white;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
        border: 1px solid #e7016e;
        cursor: pointer;
    }

    & button:hover {
        color: #e7016e;
        background-color: white;
    }

    & .checkbox .nip{
        margin-left: 30px;
        width: 70%;
    }

    & .checkbox .nip input {
        width: 50%;
    }

    & .checkbox .nip label {
        margin-right: 20px;
    }

    & h4 {
        margin: 0;
        color: #e7016e;
    }

    & h1 {
        margin: 15px 0 5px 0;
    }

    @media (max-width: 770px) {
        width: 90%;
    }
`
