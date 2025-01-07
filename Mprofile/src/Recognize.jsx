import { XSquare } from "lucide-react";
import RecognizeFace from "./components/RecognizeFace";


const RecFace = ({isOpen, onClose}) => {

    if (!isOpen) return null;

    return (
        <div className="flex flex-col items-center justify-center inset z-50 bg-opacity-50 bg-black w-full h-full font-Quicksand">
            <div className="w-10/12 h-[80%] p-3 bg-white rounded-xl overflow-auto transition-opacity duration-1000">
                <h1 className="flex justify-center items-center font-bold text-[20px] relative">
                    Register
                    <button className="absolute right-0" onClick={onClose}>
                        <XSquare size={40} color="white" fill="red"></XSquare> 
                    </button>
                </h1>
                <div>
                    <RecognizeFace></RecognizeFace>
                </div>
            </div>  
        </div>
    )
}

export default RecFace