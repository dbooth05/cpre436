import React, { useState, useContext, useRef } from 'react';
import { AccountContext } from './App';

const Upload = ({ setShowUpload }) => {

    const { accountId, setAccountId } = useContext(AccountContext);

    const fileInput = useRef();

    const uploadImage = async () => {
        const file = fileInput.current.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', accountId); // replace with actual user ID

        try {
            const response = await fetch('http://localhost:8080/upload', { // replace with your server URL
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
        setShowUpload(false);
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
