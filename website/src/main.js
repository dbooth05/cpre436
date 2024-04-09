import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './App';

import Upload from './upload';

const Main = ({ setShowLogin, setShowSignup, setLoggedIn }) => {

    const { accountId, setAccountId } = useContext(AccountContext);

    const [showUpload, setShowUpload] = useState(false);

    async function loadImages(event) {

        const url = 'http://104.190.100.80:80/pictures';

        const data = {
            "author": [],
            "uploaded": []
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        });

        const responseData = await response.json();

        let div = document.getElementById('imageArea');

        while (div.lastElementChild) {
            div.removeChild(div.lastElementChild);
        }

        const format = new Intl.DateTimeFormat(('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        }));

        for (let j = 0; j < responseData.length; j++) {

            // const date = new Date(responseData[j].upload);


            let i = document.createElement('div');
            i.innerHTML = `
                <p>${responseData[j].userID}: ${responseData[j].uploaded}: ${responseData[j].imgPath}</p>
            `;
            div.append(i);
        }

    
    };

    const logout = () => {
        setAccountId(null);
        setShowLogin(true);
        setLoggedIn(false);
    };

    const upload = () => {
        setShowUpload(!showUpload);
    }

    // TODO fix the show upload, migrate to upload.js file

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div>

            <button type='button' onClick={logout}>Logout</button>

            {showUpload && (
                <div>
                    {/* <button type='button' onClick={upload}>Cancel Upload</button> */}
                    <Upload setShowUpload={setShowUpload}/>
                </div>
            )}

            {!showUpload && (
                <button type='button' onClick={upload}>Upload Image</button>
            )}

            {/* {loadImages()} */}
            <div id="imageArea">

            </div>
        </div>
    );

}

export default Main;