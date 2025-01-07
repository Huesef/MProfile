import React, { useEffect, useRef, useState } from 'react';

const RegFace = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Load face-api models
    const loadModels = async () => {
      await Promise.all([
        window.faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        window.faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        window.faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);
      console.log('Models loaded!');
    };

    loadModels();
  }, []);

  const openCamera = async () => {
    setIsCameraOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const closeCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);
    console.log('Image captured');
    canvas.style.display = 'none';
  };
  const CapturedImageDisplay = () => (
    <div className="w-full max-w-md aspect-video bg-gray-300 rounded-md overflow-hidden relative mt-4">
      <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
    </div>
  );

  const recognizeFace = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);
    console.log('Image captured');
    canvas.style.display = 'none';
    if (!capturedImage) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl);
      console.log('Image captured');
      canvas.style.display = 'none';
      alert('Capture an image first!');
      return;
    }

    try {
      const refFace = await window.faceapi.fetchImage(capturedImage);
      const filesResponse = await fetch('http://localhost:5000/images');
      if (!filesResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const files = await filesResponse.json();

      let refFaceDataAI = await window.faceapi
        .detectAllFaces(refFace)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const faceMatcher = new window.faceapi.FaceMatcher(refFaceDataAI);

      let bestMatch = { file: null, distance: Infinity };

      for (const file of files) {
        const facetoCheck = await window.faceapi.fetchImage(`http://localhost:5000/uploads/${file}`);
        let tocheckFaceDataAI = await window.faceapi
          .detectAllFaces(facetoCheck)
          .withFaceLandmarks()
          .withFaceDescriptors();

        tocheckFaceDataAI.forEach(face => {
          const { detection, descriptor } = face;
          let match = faceMatcher.findBestMatch(descriptor);
          if (match.distance < bestMatch.distance) {
            bestMatch = { file, distance: match.distance };
          }
        });
      }

      console.log(`Best match: ${bestMatch.file} with distance: ${bestMatch.distance}`);

      const dataResponse = await fetch(`http://localhost:5000/get-user-data?imageName=${bestMatch.file}`);
      if (!dataResponse.ok) {
        throw new Error('Failed to fetch data for best match');
      }
      const userData = await dataResponse.json();
      console.log('User data:', userData);

      // Update the result state
      const displayData = (label, value) => value ? <p className=''><strong>{label}:</strong> {value}</p> : null;

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      setResult(
        <div className='overflow-auto'>
          <div className='flex-col'>
            {userData.image && <img src={`http://localhost:5000/uploads/${userData.image}`} alt="User" />}
          </div>
          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Personal Information</h3>
          <div className='flex'>
            {displayData('First Name', userData.first_name)}
            {displayData('Last Name', userData.last_name)}
            {displayData('Middle Name', userData.middle_name)}
            {displayData('Sex', userData.sex)}
            {displayData('Date of Birth', formatDate(userData.date_of_birth))}
            {displayData('Place of Birth (City)', userData.place_of_birth_city)}
            {displayData('Place of Birth (Province)', userData.place_of_birth_province)}
            {displayData('Place of Birth (Country)', userData.place_of_birth_country)}
            {displayData('Nationality', userData.nationality)}
            {displayData('Religion', userData.religion)}
            {displayData('Gender', userData.gender)}
            {displayData('Marital Status', userData.marital_status)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>

          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Partner Information</h3>
          <div className='flex-col'>
            {displayData('First Name', userData.partner_first_name)}
            {displayData('Last Name', userData.partner_last_name)}
            {displayData('Middle Name', userData.partner_middle_name)}
            {displayData('Contact Number', userData.partner_contact_number)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>

          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Address Information</h3>
          <div className='flex-col'>
            {displayData('House No', userData.address_house_no)}
            {displayData('Street', userData.address_street)}
            {displayData('Barangay', userData.address_barangay)}
            {displayData('City', userData.address_city)}
            {displayData('Province', userData.address_province)}
            {displayData('Country', userData.address_country)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>

          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Contact Information</h3>
          <div className='flex-col'>
            {displayData('Phone Number', userData.phone_number)}
            {displayData('Email', userData.email)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>

          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Employment Information</h3>
          <div className='flex-col'>
            {displayData('Occupation', userData.occupation)}
            {displayData('Company', userData.company)}
            {displayData('Years of Employment', userData.years_of_employment)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>

          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Health Information</h3>
          <div className='flex-col'>
            {displayData('Blood Type', userData.blood_type)}
            {displayData('Emergency Contact', userData.emergency_contact)}
            {displayData('Emergency Contact Number', userData.emergency_contactnum)}
            {displayData('Emergency Contact Relation', userData.emergency_contactrelation)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>

          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Mother's Information</h3>
          <div className='flex-col'>
            {displayData('First Name', userData.mparent_fname)}
            {displayData('Last Name', userData.mparent_lname)}
            {displayData('Middle Name', userData.mparent_midname)}
            {displayData('Citizenship', userData.mparent_citizenship)}
            {displayData('Age', userData.mparent_age)}
            {displayData('Occupation', userData.mparent_occupation)}
            {displayData('Residence', userData.mparent_residence)}
            {displayData('Religion', userData.mparent_religion)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>

          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Father's Information</h3>
          <div className='flex-col'>
            {displayData('First Name', userData.fparent_fname)}
            {displayData('Last Name', userData.fparent_lname)}
            {displayData('Middle Name', userData.fparent_midname)}
            {displayData('Citizenship', userData.fparent_citizenship)}
            {displayData('Age', userData.fparent_age)}
            {displayData('Occupation', userData.fparent_occupation)}
            {displayData('Residence', userData.fparent_residence)}
            {displayData('Religion', userData.fparent_religion)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>

          <h3 className='mt-2 flex left-1 text-[18px] font-bold'>Guardian's Information</h3>
          <div className='flex-col'>
            {displayData('First Name', userData.guard_fname)}
            {displayData('Last Name', userData.guard_lname)}
            {displayData('Middle Name', userData.guard_midname)}
            {displayData('Contact', userData.guard_contact)}
            {displayData('Citizenship', userData.guard_citizenship)}
            {displayData('Age', userData.guard_age)}
            {displayData('Occupation', userData.guard_occupation)}
            {displayData('Residence', userData.guard_residence)}
            {displayData('Religion', userData.guard_religion)}
          </div>
          <hr className="border-1 border-black mt-3 mb-3"></hr>
        </div>
      );
    } catch (error) {
      if (error.message.includes('expected atleast one input')) {
        alert('No face detected. Please try again.');
      } else {
        console.error('Error during face recognition:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-md aspect-video bg-gray-300 rounded-md overflow-hidden relative">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted></video>
        <canvas ref={canvasRef} className="absolute inset-0"></canvas>
        {!isCameraOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            <p>Camera is off</p>
          </div>
        )}
      </div>
      <div className="space-x-4">
        <button
          onClick={isCameraOpen ? closeCamera : openCamera}
          className={`py-2 px-4 rounded ${
            isCameraOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isCameraOpen ? 'Close Camera' : 'Open Camera'}
        </button>
        <button
          onClick={recognizeFace}
          className="py-2 px-4 rounded bg-purple-500 hover:bg-purple-600 text-white"
        >
          Recognize
        </button>
        {/* <CapturedImageDisplay></CapturedImageDisplay> */}
      </div>
      {result && (
        <div className="p-2 bg-green-100 rounded flex-col">
          <h2 className="font-bold text-[24px]">Recognition Result</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default RegFace;
