import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './App';

const Main = ({ setViewer }) => {

    const { accountId, setAccountId } = useContext(AccountContext);

    const [images, setImages] = useState([]);
    const [authors, setAuthors] = useState([]);

    // const url = 'http://104.190.100.80/pictures';
    const url = 'http://localhost:8080/pictures';
    // const accurl = 'http://104.190.100.80/accounts/';
    const accurl = 'http://localhost:8080/accounts/'

    const loadImages = async (event) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error getting images');
        }

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
        setImages([]);
        setAuthors([]); 
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
        return <img className='rounded-md' src={imgurl} alt={filename} width={225} />
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

    const getFormattedDate = (date) => {

        let formatted = `${date.getHours()}:${(date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes())} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        return formatted;
    };

    return (
        <div>

            <button className='text-right mt-1 mb-5 bg-gray-700 text-white text-md mr-10 py-1 px-2 transition-colors duration-1000 ease-in-out hover:bg-gray-400 rounded-full' type='button' onClick={logout}>Logout</button>

            <button className='text-right mt-1 mb-5 bg-gray-700 text-white text-md mr-10 py-1 px-2 transition-colors duration-1000 ease-in-out hover:bg-gray-400 rounded-full' type='button' onClick={upload}>Upload Image</button>

            <div className='flex flex-wrap' id="imageArea">
                {images.map((image, index) => (
                    <div className='bg-slate-100 border-2 border-gray-700 rounded-xl p-4 m-5 w-64 transition duration-500 ease-in-out transform hover:shadow-2xl shadow-black' key={index}>
                        {loadImage(image)}
                        <p className='item-center text-center pt-4'>
                            Author: {authors[image.userID]}
                        </p>
                        <p className='items-center text-center'>
                            {getFormattedDate(new Date(image.uploaded))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Main;