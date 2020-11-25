import '../styles/globals.css'
import React from 'react';
import AuthState from "../context/auth/authState";
import AppState from "../context/app/appState";
import appContext from '../context/app/appContext';

const MyApp = ({ Component, pageProps}) => {
  return ( 
    <AuthState>
      <AppState>
          <Component {...pageProps} />
      </AppState>
    </AuthState>
  );
}
 
export default MyApp;