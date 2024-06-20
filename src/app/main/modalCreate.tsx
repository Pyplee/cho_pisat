import React, { useRef, useState } from "react";
import Image from 'next/image'
import convertNameToPathSVG from '../findAndGetPathSVG.js';
import technologies from '../technologyBase.js';
import {api, routes} from '../routes';
import Cookies from 'js-cookie';

interface ModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
}
export default function Modal({ showModal, handleCloseModal }: ModalProps) {
  const limitedStackCount = 9;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const autocompleteRef = useRef(null);

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);
    
    const filteredTech = technologies.filter(tech => tech.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filteredTech);
  };

  const handleOptionClick = (tech: string) => {
    setSearchTerm(tech);
    setFilteredOptions([]);
    if (!selectedStack.includes(tech) && selectedStack.length < limitedStackCount) {
    setSelectedStack([...selectedStack, tech])
  };
  setSearchTerm("");
}
const handleRemoveTechClick = (tech: string) => {
  const newTech = selectedStack.filter((el) => el !== tech);
  setSelectedStack(newTech);
};

const [formData, setFormData] = useState<
  {
    name: string;
    description: string;
    stack: string[];
    course: string;
    roles: string[];
    contactUser: string;
    contactGroup: string;
    group: string;
  }
>({
  name: "",
  description: "",
  stack: [],
  course: "",
  roles: [],
  contactUser: "",
  contactGroup: "",
  group: "",
});

const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
  const { name, value } = event.target as HTMLInputElement;
  if (name === 'roles') {
    const roles = value.split(",").map((role: string) => role.trim());
    setFormData((prevState) => ({...prevState, roles }));
  } else {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
};

const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  const stack = selectedStack;
  setFormData((prevState) => ({ ...prevState, stack }));
  event.preventDefault();
  console.log("Form data:", formData);
  const token = Cookies.get('token');
    api.post(routes.addGroup(), formData ,{ headers: {"Authorization": `Bearer ${token}`},})
    .then((response) => {
      const status = response.status;
      if (status !== 200) {
        throw new Error(`Error: ${status}`);
      }
    })
    .catch((error) => console.log(error));
};

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
                  <h3 className="text-3xl font-semibold truncate text-white">
                  Создание группы
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
                  <form className="space-y-4">
                  <div className="flex space-x-4">
                    <input
                      name="group"
                      type="text"
                      id="group"
                      placeholder="Группа. Например: 2101-Д"
                      className="flex-grow p-2 rounded bg-[#2c3136] text-white bg-opacity-100"
                      onChange={handleInputChange}
                    />
                    <input
                      name="roles"
                      type="text"
                      placeholder="Роли в команде. Пример: frontend, devops"
                      className="flex-grow p-2 rounded bg-[#2c3136] text-white"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-x-4">
                  <div ref={autocompleteRef} className="w-full relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Стек"
                      className="w-full p-2 rounded bg-[#2c3136] text-white"
                    />
                    {filteredOptions.length > 0 && (
                      <ul className="absolute bg-[#222831] p-2 mt-1 w-full rounded">
                        {filteredOptions.map(tech => (
                          <li className="hover:bg-[#2c3136] hover:cursor-pointer text-white rounded-sm flex flex-row p-1" key={tech} onClick={() => handleOptionClick(tech)}>
                            <Image
                            src={convertNameToPathSVG(tech)}
                            alt="Icon tech stack"
                            width={20}
                            height={20}
                            className="pr-1"
                            />{tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      name="description"
                      type="text"
                      placeholder="Идея проекта"
                      className="flex-grow p-2 rounded bg-[#2c3136] text-white"
                      onChange={handleInputChange}
                    />
                    <input
                      name="course"
                      type="text"
                      placeholder="Курс (1, 2, 3)"
                      className="flex-grow p-2 rounded bg-[#2c3136] text-white"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex space-x-4">
                  <input
                      name="name"
                      type="text"
                      placeholder="Имя команды"
                      className="flex-grow p-2 rounded bg-[#2c3136] text-white"
                      onChange={handleInputChange}
                    />
                    <input
                      name="contactUser"
                      type="text"
                      placeholder="Ссылка на персональный tg"
                      className="flex-grow p-2 rounded bg-[#2c3136] text-white"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex space-x-4">
                  <input
                      name="contactGroup"
                      type="text"
                      placeholder="Ссылка на группу tg"
                      className="flex-grow p-2 rounded bg-[#2c3136] text-white"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full flex flex-wrap justify-start gap-0.5">
                    <p className="text-center text-white p-2 m-2">Выбранный стек:</p>
                  {selectedStack.map(tech => (
                          <div className="hover:bg-[#2c3136] hover:cursor-pointer text-white rounded-lg flex flex-row p-2 text-center inline-block m-2" key={tech} onClick={() => handleRemoveTechClick(tech)}>
                            <Image
                            src={convertNameToPathSVG(tech)}
                            alt="Icon tech stack"
                            width={30}
                            height={30}
                            className="pr-1"
                            />{tech}
                          </div>
                        ))}
                      {/* <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Create Group
                    </button> */}
                  </div>
                </form>
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
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Create Group
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