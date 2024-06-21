"use client";
import React, { useRef, useState, useEffect } from "react";
import {api, routes} from '../routes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Card from './card';
import technologies from '../technologyBase.js';
import Image from 'next/image'
import convertNameToPathSVG from '../findAndGetPathSVG.js';
import { ColorRing } from 'react-loader-spinner';
import useStore from '../store';
import ModalCreate from './modalCreate';

interface Request {
  id: string;
  name: string;
  course: string;
  description: string;
  roles: string[];
  stack: string[];
  contactUser: string;
  contactGroup: string;
  creater: string;
  dateCreated: string;
  group: string;
}

function MainComponent() {
  const [showModal, setShowModal] = React.useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const router = useRouter();
  const { requests, addRequest } = useStore();
  const limitedStackCount = 9;

  const [isLoading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const autocompleteRef = useRef(null);

  const [searchGroup, setSearchGroup] = useState('');
  const [searchRole, setSearchRole] = useState('');

  const handleSearchGroup = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchGroup((event.target as HTMLInputElement).value);
  };

  const handleSearchRole = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchRole((event.target as HTMLInputElement).value);
  };

  const filterGroups = (
    groups: Request[],
    searchGroup: string,
    searchRole: string,
    selectedStack: string[]
  ) => {
    return groups.filter(group => {
      const groupMatch = group.group.toLowerCase().includes(searchGroup.toLowerCase());
      const roleMatch = group.roles.some(role => role.toLowerCase().includes(searchRole.toLowerCase()));
      const stackMatch = group.stack.some(tech => selectedStack.includes(tech));
  
      if (searchGroup === '' && searchRole === '' && selectedStack.length === 0) {
        return true;
      } else if (searchGroup === '') {
        return roleMatch && stackMatch;
      } else if (searchRole === '') {
        return groupMatch && stackMatch;
      } else if (selectedStack.length === 0) {
        return groupMatch && roleMatch;
      }
  
      return groupMatch && roleMatch && stackMatch;
    });
  };

  const filteredGroups = filterGroups(requests, searchGroup, searchRole, selectedStack);


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (autocompleteRef.current && !(target instanceof HTMLElement && target.contains(autocompleteRef.current))) {
        setFilteredOptions([]);
      }
    };

    const token = Cookies.get('token');
    api.get(routes.userMe(), { headers: {"Authorization": `Bearer ${token}`}})
    .then((response) => {
      const status = response.status;
      if (status !== 200) {
        throw new Error(`Error: ${status}`);
      }
      setLoading(false);
    })
    .catch((error) => router.push('/auth'));

    api.get(routes.groups(), { headers: {"Authorization": `Bearer ${token}`}})
    .then((response) => {
      const status = response.status;
      if (status !== 200) {
        throw new Error(`Error: ${status}`);
      }
      console.log(response.data)
      const maped = response.data.map((obj: Request) => {
        // @ts-ignore
        const arrRoles = obj.roles.split(',');
        // @ts-ignore
        const arrStack = obj.stack.split(',');
        return {
          ...obj,
          // @ts-ignore
          roles: arrRoles.map((role) => role.trim()),
          // @ts-ignore
          stack: arrStack.map((stack) => stack.trim()),
        };
      });
      maped.forEach((el: Request) => {
        addRequest(el);
      });
    })
    .catch((error) => console.log(error));

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  console.log(requests);

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

if (isLoading) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2e3138] w-full h-full flex justify-center items-center">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
    </div>
  );
}

  return (
    <div className="flex flex-col min-h-screen bg-[#393E46] rounded-xl">
      <ModalCreate showModal={showModal} handleCloseModal={handleCloseModal} />
      <main className="flex-grow p-4 flex space-x-4 ">
        <div className="bg-[#222831] p-4 rounded-xl space-y-4 w-[300px] max-h-[346px]">
          <h2 className="text-white text-xl">Меню</h2>
          <button className="w-full bg-white py-2 rounded text-black" onClick={handleOpenModal}>
            Создать группу
          </button>
          <button className="w-full bg-white py-2 rounded text-black">
            <s>Создать письмо для отклика</s>
          </button>
          <button className="w-full bg-[#DC5F00] text-white py-2 rounded">
            Настройка профиля
          </button>
        </div>
        <div className="bg-[#222831] p-4 rounded-xl flex-grow space-y-4 max-h-[314] min-h-[208px]">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-xl">Поиск группы</h2>
            <span className="text-[#ff5c00] text-base">
              Найдено результатов: {filteredGroups.length}
            </span>
          </div>
          <form className="space-y-4">
            <div className="flex space-x-4">
              <input
                name="groupName"
                type="text"
                id="groupName"
                placeholder="Группа. Например: 2101-Д"
                className="flex-grow p-2 rounded bg-[#2c3136] text-white bg-opacity-100"
                onChange={handleSearchGroup}
              />
              <input
                name="role"
                type="text"
                placeholder="Желаемая роль в команде"
                className="flex-grow p-2 rounded bg-[#2c3136] text-white"
                onChange={handleSearchRole}
              />
            </div>
            {/* <div className="flex space-x-4">
            <input
              name="keywords"
              type="text"
              placeholder="Поиск по словам. Пример: devops, nginx"
              className="w-full p-2 rounded bg-[#2c3136] text-white"
            />
            <select
              name="sort"
              className="w-full p-2 rounded bg-[#2c3136] text-white"
            >
              <option value="relewant">Наилучшее совпадение</option>
              {/* <option value="newest">Новые</option> */}
            {/* </select> */}
            {/* </div> */}
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
            </div>
            </div>
          </form>
        </div>
      </main>
      <div className="inline-block flex">
        <div className="bg-[#222831] p-4 rounded-xl m-4 space-y-4 flex flex-wrap justify-start gap-0.5 grid-auto-rows place-self-start inline-block w-full min-h-[980px]">
          {filteredGroups.map((obj)=> (
            // @ts-ignore
            <Card group={obj} key={obj.id} selectedStack={selectedStack} />
          ))}
          {filteredGroups.length < 1 && (<h1 className="text-center text-white">Результатов не найдено</h1>)}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;