import React from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'
import { AuthProvider } from 'react-auth-kit'
import AppRouter from "./Router";

const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

const App = () => {
    return (
        <AuthProvider
            authType = {'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}>

            <AlertProvider template={AlertTemplate} {...options}>
                <Router>
                    <AppRouter />
                </Router>
            </AlertProvider>
        </AuthProvider>
    )
}

export default App

const appDiv = document.getElementById("app");
render(<App />, appDiv);