import React from 'react';
import { useNavigate } from 'react-router';
import notFoundImg from '../assets/image.png';
const Erorr = () => {
  const navigate = useNavigate();
  const onBackk = () => {
    navigate('/');
  };
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-2">
      <title>Erorr</title>
      <img
        src={notFoundImg}
        alt="404 Error - Page Not Found"
        className="w-64 h-64 md:w-80 md:h-80 mx-auto"
      />
      <div>
        <h1 className=" text-3xl leading-snug md:text-4xl">
          Error 404 <br /> OPPS!! APP NOT FOUND
        </h1>
        <h1 className="mt- mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          The App you are requesting is not found on our system. please try
          another apps
        </h1>
        <button
          onClick={() => onBackk()}
          className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 hover:bg-purple-700 shadow-lg transform hover:scale-[1.02]"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Erorr;
