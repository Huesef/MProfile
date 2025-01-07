import { XSquare } from "lucide-react";
import React, { useState } from 'react';
import RegisterPersonal from "./components/RegisterPersonal";
import RegFace from "./components/RegisterFace";
import RegFam from "./components/RegisterFam";
import AdditionaInfo from "./components/AdditionalInfo";

const RegisterForm = ({ isOpen, onClose}) => {

    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        sex: '',
        dateOfBirth: '',
        placeOfBirthCity: '',
        placeOfBirthProvince: '',
        placeOfBirthCountry: '',
        nationality: '',
        religion: '',
        gender: '',
        maritalStatus: '',
        partnerFirstName: '',
        partnerLastName: '',
        partnerMiddleName: '',
        partnerContactNumber: '',
        addressHouseNo: '',
        addressStreet: '',
        addressBarangay: '',
        addressCity: '',
        addressProvince: '',
        addressCountry: '',
        phoneNumber: '',
        email: '',
        occupation: '',
        company: '',
        yearsOfEmployment: '',
        bloodType: '',
        emergencyContact: '',
        emergencyContactNumber: '',
        emergencyContactRelation: '',
        MparentFName: '',
        MparentLName: '',
        MparentMidName: '',
        MparentCitizenship: '',
        MparentAge: '',
        MparentOccupation: '',
        MparentResidence: '',
        MparentReligion: '',
        FparentFName: '',
        FparentLName: '',
        FparentMidName: '',
        FparentCitizenship: '',
        FparentAge: '',
        FparentOccupation: '',
        FparentResidence: '',
        FparentReligion: '',
        GuardFName: '',
        GuardLName: '',
        GuardMidName: '',
        GuardContact: '',
        GuardCitizenship: '',
        GuardAge: '',
        GuardOccupation: '',
        GuardResidence: '',
        GuardReligion: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const fourthPage = (
        <>
            <RegFace formData={formData} handleInputChange={handleInputChange}></RegFace>
        </>
    )

    const firstPage =  (
        <>
            <RegisterPersonal formData={formData} handleInputChange={handleInputChange}></RegisterPersonal>
        </>
    );

    const secondPage = (
        <>
            <RegFam formData={formData} handleInputChange={handleInputChange}></RegFam>
        </>
    );

    const thirdPage = (
        <>
            <AdditionaInfo formData={formData} handleInputChange={handleInputChange}></AdditionaInfo>
        </>
    )

    const [currentPage, setCurrentPage] = useState(0);

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const pages = [
        firstPage,
        secondPage,
        thirdPage,
        fourthPage,
    ];

    const [showConfirm, setShowConfirm] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleConfirmClose = () => {
        setShowConfirm(false);
        onClose();
    };

    const handleCancelClose = () => {
        setShowConfirm(false);
    };

    const handleAttemptClose = () => {
        const hasData = Object.values(formData).some(value => value !== '' && value !== null);
        if (hasData) {
            setShowConfirm(true);
        } else {
            onClose();
        }
    };

    const handleUpload = async () => {
        if (!formData.image) {
            alert('Please capture an image first!');
            return;
        }

        const formData1 = new FormData();
        formData1.append('image', formData.image); // Attach the image file

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData1,
            });

            const result = await response.json();

            if (result.success) {
                setUploadStatus(true);
                alert(`Upload FaceID successful: ${result.message}`);
            } else {
                setUploadStatus(false);
                alert(`Upload FaceID successful: ${result.fileName}`);
                formData.image = result.fileName;

                // Save formData to the database
                const saveResponse = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const saveResult = await saveResponse.json();

                if (saveResult.success) {
                    alert('Registration successful!');
                    onClose();
                alert('Registration complete!');
                } else {
                    alert('Failed to register.');
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus(false);
            alert('Failed to upload the image.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center inset z-50 bg-opacity-50 bg-black w-full h-full font-Quicksand">
            <div className="w-10/12 h-[80%] p-3 bg-white rounded-xl overflow-auto transition-opacity duration-1000">
                <div className="flex flex-col h-full">
                    <h1 className="flex justify-center items-center font-bold text-[20px] relative">
                        Register
                        <button className="absolute right-0" onClick={handleAttemptClose}>
                            <XSquare size={40} color="white" fill="red"></XSquare> 
                        </button>
                    </h1>
                    <div className="flex-grow">
                        {pages[currentPage]}
                    </div>
                    <div className="flex justify-between mt-4">
                        {currentPage > 0 && (
                            <button className="mx-2 p-1 px-6 text-[28px] text-white bg-red-700 rounded" onClick={handlePrevious}>Previous</button>
                        )}
                        {currentPage < pages.length - 1 ? (
                            <button className="mx-2 p-1 px-6 text-[28px] text-white bg-green-700 rounded" onClick={handleNext}>Next</button>
                        ) : (
                            <button className="mx-2 p-1 px-6 text-[28px] text-white bg-[#4BA77C] rounded" onClick={handleUpload}>Register</button>
                        )}
                    </div>
                </div>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl mb-4">Unsaved Data</h2>
                        <p className="mb-4">You have unsaved data. Are you sure you want to exit?</p>
                        <div className="flex justify-end">
                            <button className="mx-2 p-1 px-6 text-[18px] text-white bg-red-700 rounded" onClick={handleConfirmClose}>Yes</button>
                            <button className="mx-2 p-1 px-6 text-[18px] text-white bg-gray-700 rounded" onClick={handleCancelClose}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;