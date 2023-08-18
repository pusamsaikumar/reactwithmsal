import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";
import { PublicClientApplication,EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import App from './App';

const pca = new PublicClientApplication({
    auth:{
        clientId:'9d77e097-3bad-465d-b661-a06016488c69',
        authority:'https://login.microsoftonline.com/5777e35f-4e72-4828-ac6f-9278613fc22c', /*https://login.microsoftonline.com/(Directory (tenant) ID) */
        redirectUri:'/',
        postLogoutRedirectUri:'/',
        clientCapabilities:['CP1']
    },
    cache:{
        cacheLocation:'localStorage',
        storeAuthStateInCookie:false
    },
    system:{
        loggerOptions:{
            loggerCallback:((level,message,containspii)=>{
                console.log(message)
            }),
           // logLevel:'Verbose'
           logLevel:'Info'
        }
    }
})

pca.addEventCallback((event) =>{
    if(event.eventType === EventType.LOGIN_SUCCESS){
        console.log(event)
        console.log(event.payload.idToken ,"evnt")
        pca.setActiveAccount(event.payload.account)
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MsalProvider instance ={pca}>
                <App  />
                </MsalProvider>
                
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
