import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './login';
import Signup from './signup';
import Main from './main';
import Upload from './upload';

export const AccountContext = createContext();

const App = () => {

    const [viewer, setViewer] = useState(0);

    const [accountId, setAccountId] = useState(null);

    const login = () => {
        setViewer(1);
    }

    return (

        <AccountContext.Provider value={{ accountId, setAccountId }}>

                <header>
                    <h1>Photoshare</h1>
                    <h2>Class: PHOTO  436X</h2>
                </header>

                {viewer === 0 && (
                    <div>
                        <h2>Welcome to Photoshare</h2>
                        <p>Please Login to access class: PHOTO 436X</p>

                        <button type='button' onClick={login}>Login</button>
                    </div>
                )}

                {viewer === 1 && (
                    <Login setViewer={setViewer} />
                )}

                {viewer === 2 && (
                    <Signup setViewer={setViewer} />
                )}

                {viewer === 3 && (
                    <Main setViewer={setViewer} />
                )}

                {viewer === 4 && (
                    <Upload setViewer={setViewer} />
                )}

                <footer>
                    <p>&copy; CPRE 436X - dbooth05 2024</p>
                </footer>

      </AccountContext.Provider>

  );
}

export default App;