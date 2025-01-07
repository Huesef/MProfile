const AdditionaInfo = ({formData, handleInputChange}) => {
  return (
    <>
        <hr className="border-1 border-black my-3"></hr>
        <h1 className="font-Quicksand font-semibold text-[18px] my-2">Additional Information</h1>
        <div className="flex flex-col space-y-4">
            <div className="flex items-center">
                <select name="bloodType" value={formData.bloodType} onChange={handleInputChange} className="border-2 border-gray-400 p-1 rounded w-full">
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <h1 className="font-Quicksand text-[16px]">Emergency Contact</h1>
            <div className="flex items-center">
                <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} placeholder="Emergency Contact Name" className="border-2 border-gray-400 p-1 rounded w-full"></input>
            </div>
            <div className="flex items-center">
                <input type="text" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleInputChange} placeholder="Emergency Contact Number" className="border-2 border-gray-400 p-1 rounded w-full"></input>
            </div>
            <div className="flex items-center">
                <input type="text" name="emergencyContactRelation" value={formData.emergencyContactRelation} onChange={handleInputChange} placeholder="Relation to Emergency Contact" className="border-2 border-gray-400 p-1 rounded w-full"></input>
            </div>
        </div>
    </>
  );
}

export default AdditionaInfo;