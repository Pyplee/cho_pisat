"use client";
import React, { useState } from "react";
import Image from 'next/image'
import convertNameToPathSVG from '../findAndGetPathSVG.js';
import ModalInfo from './modalInfo';
import { useDisclosure } from "@nextui-org/react";
interface Group {
  name: string;
  description: string;
  stack: string[];
  selectedStack: string[];
  id: string;
}

function Card({ group, selectedStack }: { group: Group; selectedStack: string[] }) {
  const { name, description, stack, id } = group;
  const [showModal, setShowModal] = React.useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div className="bg-[#272727] text-white w-[350px] p-4 rounded-xl shadow-lg w-[300px] h-[450px] p-2 m-4">
      <ModalInfo showModal={showModal} handleCloseModal={handleCloseModal} group={group} selectedStack={selectedStack} />
      <div className="w-[320px] h-[47px]">
        <h2 className="text-center text-xl font-bold mb-4 truncate">{name}</h2>
      </div>
      <hr className="border-gray-600 mb-1 h-[3px]" />
      <div className="h-[130px] max-h-[130px] flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Идея проекта:</h3>
        <p className="mb-4 custom-truncate">{description}</p>
      </div>
      <hr className="border-gray-600 mb-1" />
      <div className="h-[180px]">
        <h3 className="text-lg font-semibold mb-2">Стек проекта:</h3>
        <div className="flex flex-wrap mb-4 justify-start gap-0.5 grid-auto-rows">
          {stack.map((el, index) => (
            <div className={`inline-block bg-[#737272] p-1 m-1 rounded-lg flex flex-row p-1 ${selectedStack.includes(el) ? 'bg-[#DC5F00]' : 'bg-[#737272]'}`} key={index}>
              <Image
            src={convertNameToPathSVG(el)}
            alt="Icon tech stack"
            width={20}
            height={20}
            className="pr-1"
            />
              {el}
              </div>
          ))}
        </div>
      </div>
      <button
        id={id}
        className="bg-[#DC5F00] text-white w-full py-2 rounded-lg"
        onClick={handleOpenModal}
      >
        Подробнее
      </button>
    </div>
  );
}

export default Card;