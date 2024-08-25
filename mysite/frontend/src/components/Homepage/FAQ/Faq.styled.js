import styled from "styled-components"



export const Section = styled.div`
    height: 1000px;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
`

export const Header = styled.h1`
    width: 70%;
    margin-right: auto;
    margin-left: 40px;
    font-size: 40px;

    @media (max-width: 600px) {
        margin-left: 20px;
        font-size: 20px;
    }
`


export const Cards = styled.div`
    margin-top: 50px;
    width: 70%;
    height: 65%;

    @media (max-width: 600px) {
        width: 95%;
    }
`

export const CardComponent = styled.div`
    width: 100%;
    height: 25%;
    border: 1px solid white;
    background-color: #e7016e;
    color: white;
    display: flex;
    flex-direction: column;
    height: 38%;

    & .content {
        padding: 1% 10px 1% 10px;
        text-align: center;
        width: 98%;
        display: flex;
    }


    & .header {
        display: flex;
        align-items: center;
        height: 150px;
        width: 100%;
    }

    & .header h1 {
        font-size: 30px;
        margin-left: 30px;
        width: 50%;
    }

    & .header button {
        margin: 0;
        margin: 0 40px 0 auto;
        padding: 20px;
        background-color: transparent;
        border: none;
        transition: all 0.5s ease-in-out;
        cursor: pointer;
        color: white;
    }

    & .header button:hover {
        transform: rotate(-90deg);
    }
    
    @media (max-width: 600px) {
        & .header h1 {
            font-size: 20px;
            width: 100%;
        }
        & .content {
            font-size: 8px;
        }
    }
`