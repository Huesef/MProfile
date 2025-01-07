import React, { useRef, useEffect, useState } from 'react';

const RegFace = ({ formData, handleInputChange }) => {

    const videoRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const openCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraOpen(true);
        } catch (error) {
          console.error("Error accessing camera:", error);
          alert("Unable to access the camera. Please check permissions.");
        }
      };
    
      const closeCamera = () => {
        const stream = videoRef.current.srcObject;
        const tracks = stream?.getTracks();
        tracks?.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setIsCameraOpen(false);
      };

    const captureImage = () => {
      if (!isCameraOpen) {
        alert('Please open the camera first!');
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = 720;
      canvas.height = 400;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      let img = document.getElementById('capturedFace');
      if (!img) {
        img = document.createElement('img');
        img.name = 'image';
        img.id = 'capturedFace';
        document.querySelector('.m-2').appendChild(img);
      }
      img.src = imageDataUrl;

      // Create a Blob from the data URL and create a File object
      fetch(imageDataUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'captured-image.png', { type: 'image/png' });
          const event = { target: { files: [file] } };
          handleFileChange(event);
        });
    }

    //Handling Upload
    const [image, setImage] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]); // Save the selected image file
        handleInputChange({
            target: {
                name: 'image',
                value: event.target.files[0]
            }
        });
    };

    const handleUpload = async () => {
        if (!image) {
            alert('Please select an image first!');
            return;
        }

        const formData1 = new FormData();
        formData1.append('image', image); // Attach the image file

        try {
            const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData1,
            });

            const result = await response.json();

            if (result.success) {
            setUploadStatus(true);
            alert(`Upload successful: ${result.message}`);
            } else {
            setUploadStatus(false);
            alert(`Upload failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus(false);
            alert('Failed to upload the image.');
        }
    };

    return (
        <div className='flex items-center justify-center'>
            <div className='border-r-[3px] rounded-sm p-2 border-gray-400'>
                <div className="w-full max-w-md aspect-video bg-gray-300 rounded-md overflow-hidden relative">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted></video>
                    {!isCameraOpen && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                            <p>Camera is off</p>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    {isCameraOpen ? (
                        <button
                            onClick={closeCamera}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                            Close Camera
                        </button>
                    ) : (
                        <button
                            onClick={openCamera}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Open Camera
                        </button>
                    )}
                    <button
                    onClick={captureImage}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-4">
                    Capture Image
                </button>
                </div>
            </div>
            <div className='m-2'>
                
            </div>
        </div>
    )
}

export default RegFace;