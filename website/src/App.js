import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './login';
import Signup from './signup';
import Main from './main';

export const AccountContext = createContext();

const App = () => {
  // <Login />
  // <Signup />

    const [accountId, setAccountId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showSignup, setShowSignup] = useState(false);

    return (

        <AccountContext.Provider value={{ accountId, setAccountId }}>

            <Router>
                <header>
                    <h1>Photoshare</h1>
                    <h2>Class: PHOTO  436X</h2>
                </header>

                {/* Show login page */}
                {showLogin && (
                    <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} setLoggedIn={setLoggedIn} />
                )}
                
                {/* Show signup page */}
                {showSignup && (
                    <Signup setShowLogin={setShowLogin} setShowSignup={setShowSignup} setLoggedIn={setLoggedIn} />
                )}

                {/* Show main content page */}
                {loggedIn && (
                    <Main setShowLogin={setShowLogin} setShowSignup={setShowSignup} setLoggedIn={setLoggedIn} />
                )}

                <footer>
                    <p>&copy; CPRE 436X - dbooth 2024</p>
                </footer>

        </Router>

      </AccountContext.Provider>

  );
}

export default App;