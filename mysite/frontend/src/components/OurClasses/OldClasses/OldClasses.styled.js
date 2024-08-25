import styled from "styled-components"


export const Baner = styled.div`
    width: 100%;
    height: 700px;
    background-image: url('../../../static/images/classes.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    & h1 {
        color: white;
        font-size: 60px;
        text-align: center;
    }
`

export const Content = styled.div`
    width: 100%;
    height: 1000px;

    & h1 {
        font-size: 50px;
        margin-left: 40px;
        border-bottom: 5px solid #e7016e;
        width: 400px;
    }
`

export const Videos = styled.div`
    width: 90%;
    height: 70%;
    display: flex;
    justify-content: space-evenly;
    ${'' /* scrol */}
    flex-wrap: wrap;
    overflow: auto;
    margin: auto;
    margin-top: 80px;
`

export const Card = styled.div`
    width: 350px;
    height: 350px;
    background-color: #e7016e;
    box-shadow: 0 0 5px black;
    transition: all .5s ease-in-out;
    margin: 40px 0 40px 0;

    & span {
        height: 30%;
        width: 100%;
        border: none;
        color: white;
        display: flex;
        flex-direction: column;

        & h2 {
            margin: 0 0 0 30px;
            font-size: 30px;
        }

        & p {
            padding: 0 30px 0 30px;
            font-size: 18px;
            margin: 0;
        }
    }

    & div {
        width: 100%;
        height: 70%;
        background-image: url('../../../static/images/homepage.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & div .play-icon {
        opacity: 0.5;
        transition: all .3s ease-in-out;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    & div:hover .play-icon {
        opacity: 1;
    }

    &:hover {
        width: 400px;
        height: 400px;
        box-shadow: 0 0 15px black;
    }

    @media (max-width: 770px) {
        & span {
            & h2 {
                font-size: 24px;
            }

            & p {
                font-size: 15px;
            }
        }

    }
`