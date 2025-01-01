import { XSquare } from "lucide-react";
import React, { useState } from 'react';

const RegisterForm = ({ isOpen, onClose, children}) => {

    if (!isOpen) return null;

    const [maritalStatus, setMaritalStatus] = useState('');
    const [isMarried, setIsMarried] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleMaritalStatusChange = (e) => {
        setMaritalStatus(e.target.value);
        setIsMarried(e.target.value === 'Married');
    };

    const firstPage =  (
        <>
            <h1 className="flex justify-center items-center font-bold text-[20px] relative">
                Register
                <button className="absolute right-0" onClick={onClose}>
                    <XSquare size={40} color="white" fill="red"></XSquare> 
                </button>
            </h1>
            <hr className="border-1 border-black mt-3 mb-3"></hr>
            <h1 className="font-Quicksand font-semibold text-[18px]">Personal Information</h1>
            <div className="flex items-center">
                <input type="text" placeholder="First Name" className="border-2 border-gray-400 p-1 mt-2 rounded"></input>
                <span className="font-bold ml-2 mr-2">:</span>
                <input type="text" placeholder="Last Name" className="border-2 border-gray-400 p-1 mt-2 rounded"></input>
                <span className="font-bold ml-2 mr-2">:</span>
                <input type="text" placeholder="Middle Name" className="border-2 border-gray-400 p-1 mt-2 rounded"></input>

                <span className="font-bold mx-4">:</span>
                <span className="mr-2 font-medium">Sex -</span>
                <label for="male" className="mr-2">
                    <input type="radio" name="sex"></input>
                    <span className="ml-1">Male</span>
                </label>
                <label for="female" className="mr-2">
                    <input type="radio" name="sex"></input>
                    <span className="ml-1">Female</span>
                </label>
            </div>
            <div className="flex mt-4 items-center">
                <a className="font-medium mr-2"> Date of Birth -</a>
                <input type="date" className="border-2 pl-2 pr-2 border-gray-400 rounded"></input>
                <span className="font-bold mx-4">:</span>
                <a className="font-medium mr-2"> Place of Birth -</a>
                <input type="text" placeholder="City/Municipality" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                <input type="text" placeholder="Province" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                <input type="text" placeholder="Country" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
            </div>
            <div className="flex mt-4 items-center">
                <a className="font-medium mr-2"> Nationality -</a>
                <input type="text" placeholder="Nationality" className="border-2 border-gray-400 p-1 rounded"></input>
                <span className="font-bold mx-4">:</span>
                <a className="font-medium mr-2">Religion -</a>
                <input type="text" placeholder="Religion" className="border-2 border-gray-400 p-1 rounded"></input>
                <span className="font-bold mx-4">:</span>
                <a className="font-medium mr-2">Gender -</a>
                <label for="binary" className="mr-2">
                    <input type="radio" name="Gender"></input>
                    <span className="ml-1">Binary</span>
                </label>
                <label for="binary" className="mr-2">
                    <input type="radio" name="Gender"></input>
                    <span className="ml-1">Non-Binary</span>
                </label>
            </div>
            <div className="flex mt-4 items-center">
            <a className="font-medium mr-2">Marital Status -</a>
            <select value={maritalStatus} onChange={handleMaritalStatusChange} className="border-2 border-gray-400 p-1 rounded mr-2">
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
            </select>
            </div>
            {isMarried && (
                <div className="mt-4">
                    <h3 className="font-medium">Partner's Information</h3>
                    <input type="text" placeholder="First Name" className="border-2 border-gray-400 p-1 rounded mr-2 mt-2"></input>
                    <input type="text" placeholder="Last Name" className="border-2 border-gray-400 p-1 rounded mr-2 mt-2"></input>
                    <input type="text" placeholder="Middle Name" className="border-2 border-gray-400 p-1 rounded mr-2 mt-2"></input>
                    <input type="text" placeholder="Contact Number" className="border-2 border-gray-400 p-1 rounded mr-2 mt-2"></input>
                </div>
            )}
            <hr className="border-1 border-black my-3"></hr>
            <h1 className="font-Quicksand font-semibold text-[18px] my-2">Contact Information</h1>
            <span className="font-medium">Address</span>
            <div className="flex items-center">
                <input type="text" placeholder="House No." className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                <input type="text" placeholder="Street" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
                <input type="text" placeholder="Barangay" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
                <input type="text" placeholder="City" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
                <input type="text" placeholder="Province" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
                <input type="text" placeholder="Country" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
            </div>
            <div className="flex items-center my-2">
                <span className="font-medium mr-2">Phone Number -</span>
                <input type="tel" placeholder="Phone Number" pattern="[0-9]{10}" className="border-2 border-gray-400 p-1 rounded"></input>
                <span className="font-bold mx-4">:</span>
                <span className="font-medium mr-2">Email -</span>
                <input type="email" placeholder="Email" className="border-2 border-gray-400 p-1 rounded"></input>
            </div>
            <hr className="border-1 border-black my-3"></hr>
            <h1 className="font-Quicksand font-semibold text-[18px] my-2">Professional Information</h1>
            <div className="flex items-center">
                <input type="text" placeholder="Occupation" className="border-2 border-gray-400 p-1 rounded"></input>
                <span className="font-bold mx-4">:</span>
                <input type="text" placeholder="Company" className="border-2 border-gray-400 p-1 rounded"></input>
                <span className="font-bold mx-4">:</span>
                <input type="number" placeholder="Years of Employment" className="border-2 border-gray-400 p-1 rounded"></input>
            </div>
        </>
    );

    return (
        <div className="flex flex-col items-center justify-center inset z-50 bg-opacity-50 bg-black w-full h-full font-Quicksand">
            <div className={`w-10/12 h-[80%] p-3 bg-white rounded-xl overflow-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        {firstPage}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="mx-2 p-1 px-6 text-[28px] text-white bg-green-700 rounded" onClick={() => setIsVisible(false)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;

    // occupation

    // Parent Deets
    // bloodType
    // emergencyContact