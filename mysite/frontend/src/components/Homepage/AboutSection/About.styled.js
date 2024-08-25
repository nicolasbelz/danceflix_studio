import styled from "styled-components"


export const Section = styled.div`
    height: 620px;
    width: 100%;
`

export const Header = styled.div`
    height: 30%;
    width: 100%;
    display: flex;
    align-items: center;

    & h1 {
        margin: 0 0 0 90px;
        font-size: 50px;
        width: 200px;
        border-bottom: 5px solid #e7016e;
    }
`

export const Content = styled.div`
    height: 65%;
    width: 90%;
    display: flex;
    margin: auto;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`

export const Text = styled.span`
    height: 100%;
    width: 50%;
    color: black;
    display: flex;

    & p {
        font-size: 24px;
        padding-right: 30px;
    }

    & a {
        color: #e7016e;
        font-weight: 500;
    }

    @media (max-width: 630px) {
        & p {
            font-size: 20px;
        }
        width: 90%;
        height: 50%;
    }


    @media (max-width: 600px) {
        & p {
            font-size: 12px;
        }
    }
`

export const Video = styled.div`
    height: 100%;
    width: 50%;

    & iframe {
        width: 100%;
        height: 80%;
    }
    @media (max-width: 600px) {
        width: 90%;
        height: 50%;
    }
`