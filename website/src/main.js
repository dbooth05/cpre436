import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './App';

const Main = () => {

    const { accountId, setAccountId } = useContext(AccountContext);

    const loadImages = async (event) => {

        const url = 'http://localhost:8080/pictures';

        const data = {
            "author": [],
            "uploaded": []
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
            // body: JSON.stringify(data)
        });

        const responseData = await response.json();

    
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div>
            {/* {loadImages} */}
        </div>
    );

}

export default Main;