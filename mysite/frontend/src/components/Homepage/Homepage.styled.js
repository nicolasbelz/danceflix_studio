import styled from "styled-components"


export const HomepageBaner = styled.div`
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
        font-size: 60px;
        text-align: center;
    }

    & button {
        color: white;
        font-size: 25px;
        background-color: #e7016e;
        padding: 5px 30px 5px 30px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.7s ease-out;
    }

    & button:hover {
        background-color: white;
        color: #e7016e;
        border: 1px solid #e7016e;
    }

    @media (max-width: 770px) {
        & h1 {
            font-size: 30px;
        }

        & button {
            font-size: 15px;
        }
    }

`