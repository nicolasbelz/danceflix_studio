import styled from "styled-components"



export const Section = styled.div`
    width: 100%;
    height: 700px;
    display: flex;
`

export const Back = styled.div`
    position: absolute;
    height: 55%;
    width: 100%;
    background-color: #e7016e;
    z-index: -1;

    @media (max-width: 600px) {
        height: 50%;
    }
`

export const Image = styled.div`
    height: 80%;
    width: 30%;
    margin: 5% 10% 5% 10%;
    background-image: url('../../../static/images/features.jpg');
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;

    @media (max-width: 1000px) {
        display: none;
    }
`

export const Text = styled.div`
    height: 45%;
    width: 50%;
    padding: 40px 30px 0 30px;

    & p {
        font-size: 24px;
        color: white;
        margin-top: 40px;
    }

    & h1 {
        font-size: 30px;
        width: 290px;
        border-bottom: 5px solid white;
        padding: 10px;
    }

    @media (max-width: 600px) {
        & p {
            font-size: 12px;
            margin-top: 20px;
        }
        & h1 {
            font-size: 20px;
        }
    }

`
