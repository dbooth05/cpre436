import React, { useState, useContext } from 'react';
import { AccountContext } from './App';

const Login = ({ setShowLogin, setShowSignup, setLoggedIn }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { accountId, setAccountId } = useContext(AccountContext);

    const handleSubmit = async (event) => {
        
        event.preventDefault();

        const url = 'http://localhost:8080/accounts/login';

        const data = {
            "name":username,
            "pass":password
        };

        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            setAccountId(responseData.id);
            setShowLogin(false);
            setLoggedIn(true);
        } else {
            alert(responseData.message);
        }

    };

    const handleCreate = () => {
        setShowSignup(true);
        setShowLogin(false);
    }

    const back = () => {
        setShowLogin(false);
    }

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
                <input type="submit" value="Login"/>
            </form>

            <button id="create" type='button' onClick={handleCreate}>Create an Account</button>
            <button id="back" type='back' onClick={back}>Back</button>

        </div>
    );
}

export default Login;