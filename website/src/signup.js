import React, { useState, useContext } from 'react';
import { AccountContext } from './App';

const Signup = ({ setViewer }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { accountId, setAccountId } = useContext(AccountContext);

    // const url = 'http://104.190.100.80/accounts/signup';
    const url = 'http://localhost:3000/accounts/signup';

    const handleSubmit = async (event) => {

        event.preventDefault();

        const data = {
            "name":username,
            "email":email,
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
            setViewer(3);
        } else {
            alert(responseData.message);
        }

    };

    const handleLogin = () => {
        setViewer(1);
    }

    return (
        <div>
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Signup" />
            </form>

            <button id="login" type='button' onClick={handleLogin}>Back to Login</button>
        </div>
    );
}

export default Signup;