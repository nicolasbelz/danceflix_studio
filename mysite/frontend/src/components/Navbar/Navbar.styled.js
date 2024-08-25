import styled from "styled-components"


export const Nav = styled.nav`
    position: absolute;
    height: 100px;
    width: 100%;
    display: flex;
    -webkit-justify-content: flex-end;
    font-weight: 300;
    margin-top: 10px;

    & .nav-items {
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    & .nav-items a {
        text-decoration: none;
        font-size: 25px;
        cursor: pointer;
        color: ${props => props.color ? props.color : "white"};
        height: 50%;
    }

    & .nav-items a hr{
        width: 0;
        opacity: 0;
        margin: 0;
        color: #e7016e;
        transition: all .5s ease-in-out;
    }

    & .nav-items a:hover hr{
        width: 100%;
        opacity: 1;
    }

    & .nav-items .login-button {
        font-size: 25px;
        padding: 5px 20px 5px 20px;
        background-color: white;
        transition: all 0.5s ease-out;
        border: 1px solid #e7016e;
        cursor: pointer;
        color: #e7016e;
        height: 40px;
    }

    & .nav-items .login-button:hover {
        background-color: #e7016e;
        color: white;
    }

    @media (max-width: 900px) {
        & .nav-items {
            width: 100%;
        }

        & .nav-items a {
            font-size: 14px;
        }
        & .nav-items .login-button {
            font-size: 18px;
        }

    }

    @media (max-width: 700px) {

        & .nav-items a {
            font-size: 14px;
        }

        & .nav-items .login-button {
            font-size: 12px;
        }

    }
`

// export const Logo = styled.a`
//     width: 180px;
//     height: 90px;
//     background-image: url('../../../static/images/Logo.jpg');
//     background-position: center;
//     background-repeat: no-repeat;
//     background-size: cover;
//     margin: 5px auto 0 30px;
//     display: flex;

//     @media (max-width: 700px) {
//         display: none;
//     }
// `

export const Logo = styled.a`
    width: 450px;
    height: 90px;
    background-image: url('../../../static/images/logo_new_transparent.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 5px auto 0 30px;
    display: flex;

    @media (max-width: 700px) {
        display: none;
    }
`

export const UserButton = styled.button`
    font-size: 25px;
    padding: 10px 30px 10px 30px;
    border: 1px solid #e7016e;
    cursor: pointer;
    min-width: 100px;
    max-width: 300px;
    ${props => props.showUser ? `
    background-color: #e7016e;
    color: white;
    border: 1px solid white;
    ` : `
    color: #e7016e;
    background-color: white;
    transition: all 0.5s ease-out;

    &:hover {
        background-color: #e7016e;
        color: white;
        border: 1px solid white;
    }
    `}

`

export const UserInfo = styled.div`
    position: relative;
    margin-bottom: 15px;

    & .content {
        width: ${props => props.width}px;
        position: absolute;
        overflow: hidden;
        top: 53px;
        left: 2px;
        background-color: #e7016e;
        display: flex;
        flex-direction: column;
        min-width: 120px;
    }

    & .content a {
        margin: 0;
        text-align: center;
        padding: 10px 0 10px 0;
        border-bottom: 1px solid white;
        color: white;
        transition: all .2s ease-in-out;
    }

    & .content a:hover {
        border-right: 1px solid white;
        border-left: 1px solid white;
    }
`
