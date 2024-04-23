import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './App';

import Upload from './upload';

const Main = ({ setViewer }) => {

    const { accountId, setAccountId } = useContext(AccountContext);

    const [images, setImages] = useState([]);
    const [authors, setAuthors] = useState([]);

    // const url = 'http://104.190.100.80/pictures';
    const url = 'http://localhost:3000/pictures';
    // const accurl = 'http://104.190.100.80/accounts/';
    const accurl = 'http://localhost:8080/accounts/'

    async function loadImages(event) {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        });

        const responseData = await response.json();
        console.log(responseData);

        setImages(responseData);

        let div = document.getElementById('imageArea');

        while (div.lastElementChild) {
            div.removeChild(div.lastElementChild);
        }  
    };

    const logout = () => {
        setAccountId(null);
        setViewer(0);
    };

    const upload = () => {
        setViewer(4);
    }

    useEffect(() => {
        loadImages();
    }, []);

    useEffect(() => {
        images.forEach(image => getAuthor(image.userID))
    }, [images]);

    const loadImage = (image) => {

        const filename = image.imgName;

        const imgurl = url + "/" + filename;
        return <img src={imgurl} alt={filename} width={200} />
    }

    const getAuthor = async (userID) => {

        if (!authors[userID]) {
            const response = await fetch(accurl + userID, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json'
                }
            });
            
            let username = "";

            if (!response.ok) {
                console.log("Account not found");
                username = "uknown";
            } else {
                username = await response.text();
            }
            
            setAuthors(authors => ({...authors, [userID]:username}));
        }
    }

    return (
        <div>

            <button type='button' onClick={logout}>Logout</button>

            <button type='button' onClick={upload}>Upload Image</button>

            {/* {loadImages()} */}
            <div id="imageArea">
                {images.map((image, index) => {
                    <div key={index}>
                        {loadImage(image)}
                        <p>Author: {authors[image.userID]}</p>
                    </div>
                })}
            </div>
        </div>
    );

}

export default Main;