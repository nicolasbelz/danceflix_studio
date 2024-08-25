import styled from "styled-components"


export const Section = styled.div`
    height: 320px;
    width: 100%;
    background-color: rgb(70, 70, 70);
`

export const Columns = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & div {
        height: 80%;
        width: 20%;
        display: flex;
        flex-direction: column;
    }

    & div a {
        color: rgb(150, 150, 150);
        font-size: 30px;
        margin-top: 20px;
        width: 100%;
        text-align: center;
        text-decoration: none;
        transition: color 0.5s ease-out;
    }

    & div p {
        font-size: 20px;
        color: #757575;
        margin-bottom: 40px;
        text-align: center;
    }

    & div a:hover {
        color: rgb(200, 200, 200);
    }

    @media (max-width: 600px) {
        & div a {
            font-size: 20px;
        }

    }
`

export const Icons = styled.div`
    width: 25%;
    height: 20%;
    margin-left: 5%;
    display: flex;
    justify-content: space-evenly;
`