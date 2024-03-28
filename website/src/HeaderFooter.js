import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const HeaderFooter = () => {

    const [showLogin, setShowLogin] = useState(false);

    return (

        <Router>
            <header>
                <h1>Photoshare</h1>
                <h2>Class: PHOTO  436X</h2>
                {!showLogin && (
                    <div>
                        <button onClick={() => setShowLogin(true)}>Login</button>
                    </div>
                )}
                {showLogin && (
                    <div>
                        <button onClick={() => setShowLogin(false)}>Back</button>
                    </div>
                )}

            </header>

            {showLogin && (
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            )}

            <footer>
                <p>&copy; CPRE 436X - dbooth 2024</p>
            </footer>

        </Router>

    );

}

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        // You can now use the username and password for your login logic
    };

    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default HeaderFooter;