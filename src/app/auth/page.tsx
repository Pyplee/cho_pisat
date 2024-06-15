"use client";
import React from "react";
// Define the form schema using Zod


function MainComponent() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-[#2e3138] flex flex-col items-start p-4">
        {/* <img
          src="/path-to-logo.png"
          alt="GSfind logo"
          className="h-[40px] mb-4"
        />
        <img
          src="/path-to-your-image.jpg"
          alt="abstract background"
          className="flex-grow object-cover"
        /> */}
      </div>
      <div className="flex-1 bg-[#383b42] p-8 flex flex-col items-center justify-center">
        <h2 className="text-white font-bold text-2xl mb-6">Вход / регистрация</h2>
        <div className="w-1/2 space-y-4">
        {/* <button className="w-full bg-white text-black flex items-center justify-center py-2 rounded-md">
            <img
              className="fab fa-github mr-2"
              src="/google.svg"
              alt="Github logo"
              width="30px"
              height="30px"
            />
            Войти через google
          </button> */}
          <button className="w-full bg-white text-black flex items-center justify-center py-2 rounded-md">
            <img
              className="fab fa-github mr-2"
              src="/github_logo_black.svg"
              alt="Github logo"
              width="30px"
              height="30px"
            />
            Войти через github
          </button>
          {/* <button className="w-full bg-[#ff8300] text-white flex items-center justify-center py-2 rounded-md">
            <img
              className="fab fa-github mr-2"
              src="/telegram.svg"
              alt="Github logo"
              width="35px"
              height="35px"
            />
            Войти через telegram
          </button> */}
          {/* <div className="bg-gray-400 h-1 w-full rounded-full"></div> */}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;