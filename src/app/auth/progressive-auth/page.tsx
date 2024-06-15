"use client";
import React from "react";
import getPathSVG from '../../findAndGetPathSVG';
// Define the form schema using Zod


function MainComponent() {
  const testingSTR = "Java";
  const result = getPathSVG(testingSTR);
  return (
    <div className="min-h-screen flex">
      <h1>{result}</h1>
      <img src={result} alt="" width={100} height={100}/>
    </div>
  );
}

export default MainComponent;