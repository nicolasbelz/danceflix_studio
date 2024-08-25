import styled from "styled-components"


export const Baner = styled.div`
    width: 100%;
    height: 700px;
    background-image: url('../../../static/images/onas.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    & h1 {
        color: white;
        font-size: 55px;
        text-align: center;
    }

    @media (max-width: 770px) {
        & h1 {
            font-size: 50px;
        }
    }

`


export const Section = styled.div`
    width: 100%;
    height: 600px;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    align-items: center;
    justify-content: center;
    display: flex;

    & .content {
        height: 90%;
        width: 90%;
        display: flex;
        align-items: center;

        & .image {
            background-image: url('../../../static/images/onas.jpg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            width: 45%;
            height: 70%;
        }

        & span {
            margin-${props => props.imagePosition}: 30px;
            height: 70%;
            width: 50%;

            & p {
                font-size: 20px;
            }
        }
    }

    @media (max-width: 770px) {
        & .content span p {
            font-size: 12px;
        }
    }
`

export const Team = styled.div`
    width: 100%;
    height: 700px;
    background-color: #ff66a3;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
`

export const Card = styled.div`
    width: 22%;
    height: 80%;
    display: flex;
    flex-direction: column;
    color: white;
    align-items: center;
    text-align: center;

    & p {
        font-size: 14px;
        margin-top: 30px;
    }

    & h3 {
        margin: 20px 0 0 0;
    }

    & .image {
        width: 150px;
        height: 150px;
        background-image: url('../../../static/images/${props=>props.image}.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 100px;
        box-shadow: 0 0 15px white;
    }

    @media (max-width: 770px) {
        & p {
            font-size: 10px;
        }
    }
`