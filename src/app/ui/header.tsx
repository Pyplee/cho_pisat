import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-[#EEEEEE] px-20">
    <div className="flex items-center space-x-3">
    <Link href="/main">
      <Image src="/logo.svg"
        alt="GS find logo"
        width={100}
        height={100}
        />
    </Link>
    </div>
    <nav className="flex space-x-4">
      <a href="#" className="text-sm">
        O нас
      </a>
      <a href="#" className="text-sm">
        Помощь
      </a>
    </nav>
  </header>
  );
}

export default Header;