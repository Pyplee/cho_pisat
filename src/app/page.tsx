import Image from "next/image";
import Header from "./ui/header";
import Footer from "./ui/footer";

export default function Home() {
  return (
    <div className="font-sans">
      <div className="bg-[#EEEEEE]">
        <Header />
        <div className="text-center py-20 px-6">
          <h1 className="text-[#000000] text-5xl font-bold m-10">
            Быстрый поиск групп для практики в Колледже
          </h1>
          <a href="/auth" className="bg-[#DC5F00] text-white p-4 px-6 rounded text-lg m-2">
            Найти группу
          </a>
        </div>
      </div>
      <div className="bg-[#222831] text-[#ffffff] py-20 px-6">
        <h2 className="text-3xl font-bold mb-10">
          Делаем всё, чтобы вы легко находили идеальную группу для практики
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#EEEEEE] text-[#000000] p-8 rounded flex flex-row">
            <i className="fa fa-search text-3xl mb-4"></i>
            <p>
            Удобный поиск: Наш сайт предлагает простой и интуитивно понятный интерфейс для быстрого поиска групп для практики в колледже.
            </p>
            <Image
            alt="search"
            src="/search.svg"
            width={50}
            height={50}
            />
          </div>
          <div className="bg-[#EEEEEE] text-[#000000] p-8 rounded flex flex-row">
            <i className="fa fa-bar-chart text-3xl mb-4"></i>
            <p>
            Разнообразие групп: Вы можете найти группы по различным предметам и направлениям, от естественных наук до гуманитарных дисциплин.
            </p>
            <Image
            alt="people"
            src="/people.svg"
            width={50}
            height={50}
            />
          </div>
          <div className="bg-[#EEEEEE] text-[#000000] p-8 rounded flex flex-row">
            <i className="fa fa-map-marker text-3xl mb-4"></i>
            <p>
            Активное сообщество: Наша платформа объединяет студентов, заинтересованных в совместной учебе и обмене знаниями, что способствует созданию активного и поддерживающего сообщества.
            </p>
            <Image
            alt="people2"
            src="/people2.svg"
            width={50}
            height={50}
            />
          </div>
          <div className="bg-[#EEEEEE] text-[#000000] p-8 rounded flex flex-row">
            <i className="fa fa-tv text-3xl mb-4"></i>
            <p>
            Легкость в использовании: Регистрация и поиск групп занимают всего несколько минут, что позволяет вам быстро начать заниматься и находить новых друзей и единомышленников.
            </p>
            <Image
            alt="like"
            src="/like.svg"
            width={50}
            height={50}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
