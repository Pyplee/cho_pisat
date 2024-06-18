"use client";
import React from "react";

function Card() {


  return (
    <div className="bg-[#272727] text-white w-[350px] p-4 rounded-xl shadow-lg w-[300px] h-[400px] p-2 m-4">
      <div className="w-[320px] h-[47px]">
        <h2 className="text-center text-xl font-bold mb-4 text-ellipsis overflow-hidden ...">NameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameName</h2>
        <hr className="border-gray-600 mb-4 h-[3px]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Идеология проекта:</h3>
        <p className="mb-4">Description Description Description Description Description Description Description Description Description</p>
        <hr className="border-gray-600 mb-4" />
      </div>
      <div className="h-[130px]">
        <h3 className="text-lg font-semibold mb-2">Стек проекта:</h3>
        <div className="flex flex-wrap mb-4">techStacks</div>
      </div>
      <button
        className="bg-[#DC5F00] text-white w-full py-2 rounded-lg"
      >
        Подробнее
      </button>
    </div>
  );
}

export default Card;