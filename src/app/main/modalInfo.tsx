import React from "react";
import Image from 'next/image'
import convertNameToPathSVG from '../findAndGetPathSVG.js';
import { useRouter } from 'next/navigation';

interface ModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
}
export default function Modal({ showModal, handleCloseModal, group, selectedStack }: ModalProps) {
  const router = useRouter();
  const handleTelegtamUser = () => {
    router.push(group.contactUser);
  }

  const handleTelegtamGroup = () => {
    router.push(group.contactGroup);
  }
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#272727] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-row text-center items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <span className="font-bold text-[#FF8200] mr-10">Курс: {group.course}</span>
                  <h3 className="text-3xl font-semibold truncate">
                  {group.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCloseModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="text-white w-[600px] p-4 rounded-lg">
                  <div className="text-md font-bold mb-2">Описание:</div>
                  <div className="text-md mb-4">{group.description}</div>
                  <div className="text-md font-bold mb-2">Роли:</div>
                  <div className="text-md mb-4 flex flex-row">
                  {group.roles.map((el, index) => (
                    <div className={`inline-block p-1 m-1 rounded-lg p-1`} key={index}>
                      {el}
                      </div>
                  ))}
                  </div>
                  <div className="text-md font-bold mb-2">Стек:</div>
                  <div className="flex items-center mb-4">
                  {group.stack.map((el, index) => (
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
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="flex items-center p-2 rounded bg-[#DC5F00]" onClick={handleTelegtamUser}>
                      <Image
                        src='telegram.svg'
                        alt="creator avatar"
                        className="rounded-full"
                        width={30}
                        height={30}
                      />
                        <i className="fas fa-user-plus mr-1"></i>Создатель
                      </button>
                      <button className="flex items-center p-2 rounded bg-[#DC5F00]" onClick={handleTelegtamGroup}>
                      <Image
                        src='telegram.svg'
                        alt="creator avatar"
                        className="rounded-full"
                        width={30}
                        height={30}
                      />
                        <i className="fab fa-telegram-plane mr-1"></i>Беседа
                      </button>
                      {/* <button className="flex items-center p-2 rounded bg-[#DC5F00]">
                        <i className="fas fa-envelope mr-1"></i>Почта
                      </button> */}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Создатель:</span>
                      <Image
                        src='user-none.svg'
                        alt="creator avatar"
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}