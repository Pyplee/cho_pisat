import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
  <footer className="bg-[#222831] text-center p-2 flex justify-end items-center space-x-2">
    <Link href="https://github.com" className="text-[#DC5F00] text-2xl">
      <Image src="/github_logo.svg"
        alt="Github logo"
        width={35}
        height={35}
        />
    </Link>
  </footer>
  );
}

export default Footer;