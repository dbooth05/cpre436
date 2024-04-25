import React, { useState, useContext } from 'react';
import { AccountContext } from './App';

const Signup = ({ setViewer }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { accountId, setAccountId } = useContext(AccountContext);

    // const url = 'http://104.190.100.80/accounts/signup';
    const url = 'http://localhost:8080/accounts/signup';

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

            <button className='text-right mt-1 mb-5 bg-gray-700 text-white text-md mr-10 py-1 px-2 transition-colors duration-1000 ease-in-out hover:bg-gray-400 rounded-full' id="login" type='button' onClick={handleLogin}>Back to Login</button>

            <h2 className='text-2xl'>
                Signup Page
            </h2>

            <form className='mt-5 block' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label className='text-lg'>
                        Username:
                        <input className='mx-2 border-solid border-black border-2 rounded-lg' type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>    
                </div>

                <div className='mb-5'>
                    <label className='text-lg'>
                        Email:
                        <input className='ml-11 mx-2 border-solid border-black border-2 rounded-lg' type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                </div>
                
                <div>
                    <label className='text-lg'>
                        Password:
                        <input className='ml-3 mx-2 border-solid border-black border-2 rounded-lg' type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>

                <div>
                    <input className='mt-5 bg-gray-700 text-white text-md mr-10 py-1 px-2 transition-colors duration-1000 ease-in-out hover:bg-gray-400 rounded-full' type="submit" value="Signup" />
                </div>
            
            </form>

        </div>
    );
}

export default Signup;