import React, { useState } from 'react';

const RegisterPersonal = ({ formData, handleInputChange }) => {

    const [isVisible, setIsVisible] = useState(true);
    const [maritalStatus, setMaritalStatus] = useState('');
    const [isMarried, setIsMarried] = useState(false);

    const handleMaritalStatusChange = (e) => {
        setMaritalStatus(e.target.value);
        setIsMarried(e.target.value === 'Married');
    };

    return (
        <>
        <h1 className="font-Quicksand font-semibold text-[18px]">Personal Information</h1>
        <div className="flex items-center">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="border-2 border-gray-400 p-1 mt-2 rounded"></input>
            <span className="font-bold ml-2 mr-2">:</span>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="border-2 border-gray-400 p-1 mt-2 rounded"></input>
            <span className="font-bold ml-2 mr-2">:</span>
            <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Middle Name" className="border-2 border-gray-400 p-1 mt-2 rounded"></input>

            <span className="font-bold mx-4">:</span>
            <span className="mr-2 font-medium">Sex -</span>
            <label htmlFor="male" className="mr-2">
                <input type="radio" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleInputChange}></input>
                <span className="ml-1">Male</span>
            </label>
            <label htmlFor="female" className="mr-2">
                <input type="radio" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleInputChange}></input>
                <span className="ml-1">Female</span>
            </label>
        </div>
        <div className="flex mt-4 items-center">
            <a className="font-medium mr-2"> Date of Birth -</a>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="border-2 pl-2 pr-2 border-gray-400 rounded"></input>
            <span className="font-bold mx-4">:</span>
            <a className="font-medium mr-2"> Place of Birth -</a>
            <input type="text" name="placeOfBirthCity" value={formData.placeOfBirthCity} onChange={handleInputChange} placeholder="City/Municipality" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
            <input type="text" name="placeOfBirthProvince" value={formData.placeOfBirthProvince} onChange={handleInputChange} placeholder="Province" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
            <input type="text" name="placeOfBirthCountry" value={formData.placeOfBirthCountry} onChange={handleInputChange} placeholder="Country" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
        </div>
        <div className="flex mt-4 items-center">
            <a className="font-medium mr-2"> Nationality -</a>
            <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="Nationality" className="border-2 border-gray-400 p-1 rounded"></input>
            <span className="font-bold mx-4">:</span>
            <a className="font-medium mr-2">Religion -</a>
            <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} placeholder="Religion" className="border-2 border-gray-400 p-1 rounded"></input>
            <span className="font-bold mx-4">:</span>
            <a className="font-medium mr-2">Gender -</a>
            <label htmlFor="binary" className="mr-2">
                <input type="radio" name="gender" value="Binary" checked={formData.gender === 'Binary'} onChange={handleInputChange}></input>
                <span className="ml-1">Binary</span>
            </label>
            <label htmlFor="nonBinary" className="mr-2">
                <div>
                    <input type="radio" name="gender" value="Non-Binary" checked={formData.gender === 'Non-Binary'} onChange={handleInputChange}></input>
                    <span className="ml-1">Non-Binary</span>
                </div>
            </label>
        </div>
        <div className="flex mt-4 items-center">
        <a className="font-medium mr-2">Marital Status -</a>
        <select name="maritalStatus" value={formData.maritalStatus} onChange={(e) => { handleInputChange(e); handleMaritalStatusChange(e); }} className="border-2 border-gray-400 p-1 rounded mr-2">
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
                <input type="text" name="partnerFirstName" value={formData.partnerFirstName} onChange={handleInputChange} placeholder="First Name" className="border-2 border-gray-400 p-1 rounded mr-2 mt-2"></input>
                <input type="text" name="partnerLastName" value={formData.partnerLastName} onChange={handleInputChange} placeholder="Last Name" className="border-2 border-gray-400 p-1 rounded mr-2 mt-2"></input>
                <input type="text" name="partnerMiddleName" value={formData.partnerMiddleName} onChange={handleInputChange} placeholder="Middle Name" className="border-2 border-gray-400 p-1 rounded mr-2 mt-2"></input>
                <input type="text" name="partnerContactNumber" value={formData.partnerContactNumber} onChange={handleInputChange} placeholder="Contact Number" className="border-2 border-gray-400 p-1 rounded mr-2 mt-2"></input>
            </div>
        )}
        <hr className="border-1 border-black my-3"></hr>
        <h1 className="font-Quicksand font-semibold text-[18px] my-2">Contact Information</h1>
        <span className="font-medium">Address</span>
        <div className="flex items-center">
            <input type="text" name="addressHouseNo" value={formData.addressHouseNo} onChange={handleInputChange} placeholder="House No." className="border-2 border-gray-400 p-1 rounded mr-2"></input>
            <input type="text" name="addressStreet" value={formData.addressStreet} onChange={handleInputChange} placeholder="Street" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
            <input type="text" name="addressBarangay" value={formData.addressBarangay} onChange={handleInputChange} placeholder="Barangay" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
            <input type="text" name="addressCity" value={formData.addressCity} onChange={handleInputChange} placeholder="City" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
            <input type="text" name="addressProvince" value={formData.addressProvince} onChange={handleInputChange} placeholder="Province" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
            <input type="text" name="addressCountry" value={formData.addressCountry} onChange={handleInputChange} placeholder="Country" className="border-2 border-gray-400 p-1 rounded mx-2"></input>
        </div>
        <div className="flex items-center my-2">
            <span className="font-medium mr-2">Phone Number -</span>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" pattern="[0-9]{10}" className="border-2 border-gray-400 p-1 rounded"></input>
            <span className="font-bold mx-4">:</span>
            <span className="font-medium mr-2">Email -</span>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border-2 border-gray-400 p-1 rounded"></input>
        </div>
        <hr className="border-1 border-black my-3"></hr>
        <h1 className="font-Quicksand font-semibold text-[18px] my-2">Professional Information</h1>
        <div className="flex items-center">
            <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} placeholder="Occupation" className="border-2 border-gray-400 p-1 rounded"></input>
            <span className="font-bold mx-4">:</span>
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company" className="border-2 border-gray-400 p-1 rounded"></input>
            <span className="font-bold mx-4">:</span>
            <input type="number" name="yearsOfEmployment" value={formData.yearsOfEmployment} onChange={handleInputChange} placeholder="Years of Employment" className="border-2 border-gray-400 p-1 rounded"></input>
        </div>
    </>
    )
}

    export default RegisterPersonal;