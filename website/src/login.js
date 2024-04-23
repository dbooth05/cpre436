import React, { useState, useContext } from 'react';
import { AccountContext } from './App';

const Login = ({ setViewer}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { accountId, setAccountId } = useContext(AccountContext);

    // const url = 'http://104.190.100.80/accounts/login';
    const url = 'http://localhost:3000/accounts/login';

    const handleSubmit = async (event) => {
        
        event.preventDefault();

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
            setViewer(3);
        } else {
            alert(responseData.message);
        }

    };

    const handleCreate = () => {
        setViewer(2);
    }

    const back = () => {
        setViewer(0);
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