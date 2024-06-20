"use client"
import React, { useState } from "react";
import {api, routes} from '../routes';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { ColorRing } from 'react-loader-spinner'
import Cookies from 'js-cookie';
import Image from 'next/image'


function MainComponent() {
  const [isLoading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const queryString = searchParams.getAll('code');
  const router = useRouter()

  useEffect(() => {
    if (queryString.length > 0) {
      api.get(routes.sendTokenGithub(queryString))
        .then((response) => {
          const status = response.status;
          if (status !== 200) {
            throw new Error(`Error: ${status}`);
        }
        return response;
    })
    .then((response) => {
      Cookies.set('token', response.data.value);
    })
    .then(() => {
      router.push('/main');
    })
    .catch((error) => {
      console.log(error);
    });
    }  else {
      setLoading(false);
    }
  }, [queryString, router]);

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

  const handleRedirectGithub = async () => {
    try {
      const response = await api.get(routes.redirectGithub());
      const url = routes.redirectGithub();
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      // window.location.href = url;
      router.push(url);
    } catch (error) {
      console.error(error);
    }
  }

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
          <button
          className="w-full bg-white text-black flex items-center justify-center py-2 rounded-md"
          onClick={handleRedirectGithub}
          >
            <Image
              className="fab fa-github mr-2"
              src="/github_logo_black.svg"
              alt="Github logo"
              width={30}
              height={30}
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