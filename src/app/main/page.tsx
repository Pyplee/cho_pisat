"use client";
import React from "react";

function MainComponent() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.create.xyz/integrations/gpt-vision/",
        {
          method: "POST",
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "What happens when the glove drops?" },
                  {
                    type: "image_url",
                    image_url: { url: "data:image/png;base64,/9j/4AAQ..." },
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const result = data.choices[0].message.content;
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#393E46] p-4 rounded-xl m-4 space-y-4">
        <div className="flex-grow p-4 bg-[#393E46] flex space-x-4">
          <div className="bg-[#222831] p-8 rounded-lg w-[800px] mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-4xl font-roboto">Поиск группы</h1>
          <span className="text-[#DC5F00] text-xl font-roboto">
            Найдено результатов: 10
          </span>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <label className="block text-white mb-2 font-roboto">
              Учебная группа
            </label>
            <input
              name="group"
              type="text"
              placeholder="Пример: 2101-О"
              className="w-full px-4 py-2 rounded-md bg-[#EEEEEE] text-black placeholder-gray-500 font-roboto"
            />
          </div>
          <div>
            <label className="block text-white mb-2 font-roboto">
              Желаемая роль
            </label>
            <input
              name="role"
              type="text"
              placeholder="Пример: тестировщик"
              className="w-full px-4 py-2 rounded-md bg-[#EEEEEE] text-black placeholder-gray-500 font-roboto"
            />
          </div>
          <div>
            <label className="block text-white mb-2 font-roboto">
              Поиск по ключевым словам
            </label>
            <textarea
              name="keywords"
              placeholder="Пример: backend, frontend, stack, devops,"
              className="w-full px-4 py-2 rounded-md bg-[#EEEEEE] text-black placeholder-gray-500 font-roboto h-[100px]"
            ></textarea>
          </div>
          <div>
            <label className="block text-white mb-2 font-roboto">
              Сортировать по
            </label>
            <select
              name="sort"
              className="w-full px-4 py-2 rounded-md bg-[#EEEEEE] text-black font-roboto"
            >
              <option>Наилучшему совпадению</option>
            </select>
          </div>
        </div>
        <div className="mt-8">
          <label className="block text-white mb-2 font-roboto">Стек</label>
          <div className="flex items-center bg-[#EEEEEE] rounded-md">
            <input
              name="stack_search"
              type="text"
              placeholder="Поиск ..."
              className="w-full px-4 py-2 bg-[#EEEEEE] text-black placeholder-gray-500 font-roboto"
            />
          </div>
          <div className="mt-2 bg-[#EEEEEE] p-4 rounded-md h-[200px] overflow-y-scroll">
            <ul className="font-roboto text-black space-y-2">
              <li>react</li>
              <li>js</li>
              <li>node</li>
              <li>bootstrap</li>
              <li>tailwind</li>
              <li>docker</li>
              <li>nginx</li>
              <li>vue</li>
              <li>
                nextjs <span className="text-black">✔</span>
              </li>
              <li>
                oauth 2.0 <span className="text-black">✔</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#222831] p-4 rounded-xl space-y-4 w-[300px]">
            <h2 className="text-white text-xl">Меню</h2>
            <button className="w-full bg-white py-2 rounded">
              Создать группу
            </button>
            <button className="w-full bg-white py-2 rounded">
              Создать письмо для отклика
            </button>
            <button className="w-full bg-[#DC5F00] text-white py-2 rounded">
              Настройка профиля
            </button>
          </div>
        </div>
        <div>
          <div className="bg-[#2c3136] p-4 rounded-xl space-y-2 text-white w-[300px]">
            <h3 className="text-lg">Фотосинтез</h3>
            <p className="text-sm">
              Идеология проекта: Создание сайта для поиска групп для студентов,
              это облегчит поиск людей для учебной практики
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-[#DC5F00] py-1 px-2 rounded">
                react
              </span>
              <span className="text-xs bg-[#DC5F00] py-1 px-2 rounded">
                nextjs
              </span>
              <span className="text-xs bg-[#DC5F00] py-1 px-2 rounded">
                tailwind
              </span>
            </div>
            <button className="w-full bg-[#DC5F00] text-white py-2 rounded">
              Подробнее
            </button>
          </div>
          <div className="bg-[#2c3136] p-4 rounded-xl space-y-2 text-white w-[300px]">
            <h3 className="text-lg">Фотосинтез</h3>
            <p className="text-sm">
              Идеология проекта: Создание сайта для поиска групп для студентов,
              это облегчит поиск людей для учебной практики
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-[#DC5F00] py-1 px-2 rounded">
                react
              </span>
              <span className="text-xs bg-[#DC5F00] py-1 px-2 rounded">
                nextjs
              </span>
              <span className="text-xs bg-[#DC5F00] py-1 px-2 rounded">
                tailwind
              </span>
            </div>
            <button className="w-full bg-[#DC5F00] text-white py-2 rounded">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;