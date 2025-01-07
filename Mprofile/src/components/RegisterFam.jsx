const RegisterFam = ({formData, handleInputChange}) => {
    return (
        <>
            <div key="secondPage" className="flex flex-col">
                <hr className="border-1 border-black mt-3 mb-3"></hr>
                <h1 className="font-Quicksand font-semibold text-[18px]">Family Information</h1>
                <h1 className="font-Quicksand text-[16px] mt-2">Mothers Information</h1>
                <div className="flex items-center">
                    <input type="text" name="MparentFName" value={formData.MparentFName} onChange={handleInputChange} placeholder="First Name" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="MparentLName" value={formData.MparentLName} onChange={handleInputChange} placeholder="Last Name" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="MparentMidName" value={formData.MparentMidName} onChange={handleInputChange} placeholder="Middle Name" className="border-2 border-gray-400 p-1 rounded"></input>
                    <span className="font-bold mx-4">:</span>
                    <input type="number" name="MparentAge" value={formData.MparentAge} onChange={handleInputChange} placeholder="Age" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="MparentCitizenship" value={formData.MparentCitizenship} onChange={handleInputChange} placeholder="Citizenship" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                </div>
                <div className="flex items-center mt-4">
                <input type="text" name="MparentOccupation" value={formData.MparentOccupation} onChange={handleInputChange} placeholder="Occupation" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                <input type="text" name="MparentResidence" value={formData.MparentResidence} onChange={handleInputChange} placeholder="Residence" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="MparentReligion" value={formData.MparentReligion} onChange={handleInputChange} placeholder="Religion" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                </div>
                <h1 className="font-Quicksand text-[16px] mt-2">Fathers Information</h1>
                <div className="flex items-center">
                    <input type="text" name="FparentFName" value={formData.FparentFName} onChange={handleInputChange} placeholder="First Name" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="FparentLName" value={formData.FparentLName} onChange={handleInputChange} placeholder="Last Name" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="FparentMidName" value={formData.FparentMidName} onChange={handleInputChange} placeholder="Middle Name" className="border-2 border-gray-400 p-1 rounded"></input>
                    <span className="font-bold mx-4">:</span>
                    <input type="number" name="FparentAge" value={formData.FparentAge} onChange={handleInputChange} placeholder="Age" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="FparentCitizenship" value={formData.FparentCitizenship} onChange={handleInputChange} placeholder="Citizenship" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                </div>
                <div className="flex items-center mt-4">
                <input type="text" name="FparentOccupation" value={formData.FparentOccupation} onChange={handleInputChange} placeholder="Occupation" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                <input type="text" name="FparentResidence" value={formData.FparentResidence} onChange={handleInputChange} placeholder="Residence" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="FparentReligion" value={formData.FparentReligion} onChange={handleInputChange} placeholder="Religion" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                </div>
                <hr className="border-1 border-black my-3"></hr>
                <h1 className="font-Quicksand font-medium text-[18px] mb-2">Guardian Information</h1>
                <div className="flex items-center">
                    <input type="text" name="GuardFName" value={formData.GuardFName} onChange={handleInputChange} placeholder="First Name" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="GuardLName" value={formData.GuardLName} onChange={handleInputChange} placeholder="Last Name" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="GuardMidName" value={formData.GuardMidName} onChange={handleInputChange} placeholder="Middle Name" className="border-2 border-gray-400 p-1 rounded"></input>
                    <span className="font-bold mx-4">:</span>
                    <input type="number" name="GuardAge" value={formData.GuardAge} onChange={handleInputChange} placeholder="Age" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="GuardCitizenship" value={formData.GuardCitizenship} onChange={handleInputChange} placeholder="Citizenship" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                </div>
                <div className="flex items-center mt-4">
                    <input type="text" name="GuardOccupation" value={formData.GuardOccupation} onChange={handleInputChange} placeholder="Occupation" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="GuardResidence" value={formData.GuardResidence} onChange={handleInputChange} placeholder="Residence" className="border-2 border-gray-400 p-1 rounded mr-2"></input>
                    <input type="text" name="GuardContact" value={formData.GuardContact} onChange={handleInputChange} placeholder="Contact" className="border-2 border-gray-400 p-1 rounded"></input>
                    <span className="font-bold mx-4">:</span>
                    <input type="text" name="GuardReligion" value={formData.GuardReligion} onChange={handleInputChange} placeholder="Religion" className="border-2 border-gray-400 p-1 rounded "></input>
                </div>
            </div>
        </>
    )
}

export default RegisterFam;