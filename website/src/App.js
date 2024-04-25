import React from 'react';
import { useState, createContext } from 'react';

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

            <div className=' h-screen flex flex-col'>
                <header className=' bg-gray-700 text-white p-8 flex items-center justify-between'>
                    <div className=''>
                        <h1 className=' text-3xl' >Photoshare</h1>
                        <h2>Class: PHOTO  436X</h2>
                    </div>
                    <div className=' ml-auto text-right text-sm'>
                        <p>
                            Welcome to Photoshare, a website developed for CPRE 436X Final Project
                            at Iowa State University.
                        </p>
                    </div>
                </header>

                <div className='flex-grow my-10 mx-16'>
                    {viewer === 0 ? (
                        <div >
                            <h2 className='text-2xl'>
                                Welcome to Photoshare
                            </h2>
                            <p className='text-lg'>Please Login to access class: PHOTO 436X</p>

                            <button className='mt-5 bg-gray-700 text-white text-md mr-10 py-1 px-2 transition-colors duration-1000 ease-in-out hover:bg-gray-400 rounded-full' type='button' onClick={login}>Login</button>
                        </div>
                    ) : viewer === 1 ? (
                        <Login setViewer={setViewer} />
                    ) : viewer === 2 ? (
                        <Signup setViewer={setViewer} />
                    ) : viewer === 3 ? (
                        <Main setViewer={setViewer} />
                    ) : viewer === 4 ? (
                        <Upload setViewer={setViewer} />
                    ) : null}
                </div>

                <footer className='bg-gray-700 text-white p-4 text-center text-sm'>
                    <p>&copy; CPRE 436X - dbooth05 2024</p>
                </footer>
            </div>

      </AccountContext.Provider>

  );
}

export default App;