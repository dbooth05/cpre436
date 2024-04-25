import React, { useState, useContext, useRef, useEffect } from 'react';
import { AccountContext } from './App';

const Upload = ({ setViewer }) => {


    const { accountId, setAccountId } = useContext(AccountContext);

    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();


    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    // const url = 'http://104.190.100.80/pictures/upload';
    const url = 'http://localhost:8080/pictures/upload';
    
    const uploadImage = async () => {
        const file = selectedFile;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userID', accountId);

        if (!(file && file.type.startsWith('image/'))) {
            alert("Can only upload images");
            return;
        }

        try {
            const response = await fetch(url, { // replace with your server URL
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.text();
            alert(data);

            setViewer(3);

        } catch (error) {
            console.error('Error:', error);
            alert(error);
        }
    };

    const cancelUpload = () => {
        setViewer(3);
    }

    return (
        <div className=''>
            <button className='text-right mt-1 mb-5 bg-gray-700 text-white text-md mr-10 py-1 px-2 transition-colors duration-1000 ease-in-out hover:bg-gray-400 rounded-full' type='button' onClick={cancelUpload}>Cancel Upload</button>

            <div className='mt-5'>
                <input type="file" onChange={handleFileInputChange} accept='image/*' />
                {previewSource && (
                    <div className='my-5 rounded-lg w-64 overflow-hidden'>
                        <img src={previewSource} alt="chosen image" />
                    </div>
                )}
            </div>

            <div className='mt-5'>
                <button className='text-right mt-1 mb-5 bg-gray-700 text-white text-md mr-10 py-1 px-2 transition-colors duration-1000 ease-in-out hover:bg-gray-400 rounded-full' onClick={uploadImage}>Upload</button>
            </div>
            
        </div>
    );
}

export default Upload;
