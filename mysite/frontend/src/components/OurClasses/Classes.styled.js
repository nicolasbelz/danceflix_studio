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
    flex-wrap: wrap;
    overflow: auto;
    margin: auto;
    margin-top: 80px;
`

// New Netflix component
export const Container = styled.div`
    margin-top: 30px;
    padding: 30px 0px 26px;
    display: grid;
    grid-gap: 25px;
    gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`
// New Netflix component
export const Wrap = styled.div`
    padding-top: 56.25%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);    

    img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
    }

    &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
  }

`

// Netflix container v2
export const Container2 = styled.div`
    grid sm: mt-12;
    xl: grid-cols-4;
    lg: grid-cols-3
    sm: grid-cols-2 grid-cols-2 gap-10;
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