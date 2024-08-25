import styled from "styled-components"


export const Baner = styled.div`
    width: 100%;
    height: 700px;
    background-image: url('../../../static/images/offers.jpg');
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    & h1 {
        color: white;
        font-size: 60px;
        text-align: center;
    }
`

export const Content = styled.div`
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
export const Content2 = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

export const Card = styled.div`
    width: 25%;
    height: 75%;
    background-color: #e7016e;
    border-radius: 20px;
    color: white;
    transition: all 0.5s ease-out;
    display: flex;
    flex-direction: column;
    animation: fade-in 1s ease-out;

    & li {
        margin: 20px 0 0 30px;
        font-size: 20px;
    }

    & hr {
        width: 70%;
    }

    & h1 {
        font-size: 60px;
        text-align: center;
    }

    & h1 a {
        font-size: 20px;
    }

    & .offer-button {
        margin: auto;
        padding: 8px 25px 8px 25px;
        font-size: 20px;
        border: none;
        border: 1px solid #e7016e;
        border-radius: 10px;
        background-color: white;
        color: #e7016e;
        transition: all 0.5s ease-out;
        cursor: pointer;
        text-decoration: none;
    }

    &:hover {
        background-color: white;
        color: #e7016e;
        border: 2px solid #e7016e;
        transform: translateY(-10px);
    }

    & .offer-button:hover {
        color: white;
        background-color: #e7016e;
    }


    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @media (max-width: 770px) {
        width: 50%;

        & h1 {
            font-size: 40px;
        }

        & h1 a {
            font-size: 15px;
        }

        & li {
            font-size: 15px;
        }
    }
`


export const SelectCurrency = styled.select`
    position: absolute;
    left: 40%;
    top: 730px;
    width: 20%;
`