import { ArrowRight } from "lucide-react";
import { PersonStanding } from "lucide-react";
import { ScanFace } from "lucide-react";

import { useState } from "react";
import RegisterForm from "./Register";

const LoginPage = () =>{

    const [isRegister, setIsRegister] = useState(false);

    const handleOpenRegister = () => setIsRegister(true);
    const handleCloseRegister = () => setIsRegister(false);

    return (
        <div className="flex items-center h-screen bg-gradient-to-r from-blue-500/100 to-green-200">
            <div className="m-10 h-[60%] w-[35%] opacity-0 animate-fadeIn transition ease-in duration-300">
                <h1 className="flex font-roboto font-medium text-[48px] text-white italic">
                    <PersonStanding size={60}></PersonStanding>
                    ProFind
                </h1>
                <p className="mt-1 text-white font-light text-[20px]">
                    Profile Finder, a place to store profiles equipped with face recognition, 
                    offers a seamless and secure way to manage personal or organizational data.
                </p>
                <button className="flex items-center mt-5 mr-3 mb-3 p-1 border" onClick={handleOpenRegister}>
                    <h1 className="text-white text-[28px]">Register</h1>
                    <ArrowRight color="white" size={50} className="ml-5"></ArrowRight>
                </button>

                <button className="flex items-center mt-3 mr-3 mb-3 p-1 border">
                    <h1 className="text-white">Recognize Face</h1>
                    <ScanFace color="white" size={20} className="ml-2"></ScanFace>
                </button>
            </div>
            {isRegister && (
                <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn transition ease-in duration-75">
                    <RegisterForm isOpen={isRegister} onClose={handleCloseRegister} />
                </div>
            )}
            <div className="flex flex-1 items-center justify-center m-10 animate-slideInFromRight transition ease-out duration-500 delay-1000">  
                <img src="../imageResources/HomePage.png" className="p-8 animate-float max-w-full h-auto"></img>
            </div>
        </div>
    )   
}

export default LoginPage;