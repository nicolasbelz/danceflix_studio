import styled from "styled-components"


export const Section = styled.div`
    width: 100%;
    height: 650px;
    background-color: #e7016e;
`

export const Header = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    -webkit-justify-content: flex-end;
    background-color: rgb(70, 70, 70);

    & h1 {
        font-size: 50px;
        color: white;
        z-index: 1;
        width: 400px;
        border-bottom: 5px solid #e7016e;
        margin: 20px 40px 0 0;
        height: 60px;
    }

    @media (max-width: 600px) {
        & h1 {
            font-size: 30px;
        }
    }
`

export const Content = styled.div`
    width: 90%;
    height: 70%;
    display: flex;
    margin: auto;
    justify-content: space-evenly;
    align-items: center;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`

export const Card = styled.div`
    width: 30%;
    height: 70%;
    text-align: center;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 20px;

    & p {
        color: black;
        padding: 15px;
        font-size: 20px;
        margin: 20px 0 0 0;
    }

    & h3 {
        margin: 10px 0 0 0;
        font-size: 24px;
    }

    @media (max-width: 600px) {
        width: 70%;
        height: 30%;
        & p {
            font-size: 10px;
            margin: 10px 0 0 0;
        }

        & h3 {
            font-size: 12px;
        }
    }

`

export const Icon = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`