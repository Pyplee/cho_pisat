import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
  <div className='bg-[#EEEEEE] pt-20'>
    <footer className="bg-[#222831] text-center p-2 flex justify-end items-center space-x-2 px-20">
      <Link href="https://github.com/Pyplee/gsfind_frontend" className="text-[#DC5F00] text-2xl">
        <Image src="/github_logo_orange.svg"
          alt="Github logo"
          width={35}
          height={35}
          />
      </Link>
    </footer>
  </div>
  );
}

export default Footer;