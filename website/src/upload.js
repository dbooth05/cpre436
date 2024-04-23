import React, { useState, useContext, useRef } from 'react';
import { AccountContext } from './App';

const Upload = ({ setViewer }) => {

    const { accountId, setAccountId } = useContext(AccountContext);

    const fileInput = useRef();

    // const url = 'http://104.190.100.80/pictures/upload';
    const url = 'http://localhost:3000/pictures/upload';

    const uploadImage = async () => {
        const file = fileInput.current.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userID', accountId);

        try {
            const response = await fetch(url, { // replace with your server URL
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const cancelUpload = () => {
        setViewer(3);
    }

    return (
        <div>
            <button type='button' onClick={cancelUpload}>Cancel Upload</button>

            <input type="file" ref={fileInput} />
            <button onClick={uploadImage}>Upload</button>
        </div>
    );
}

export default Upload;
