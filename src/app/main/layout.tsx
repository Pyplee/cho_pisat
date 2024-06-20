import Header from '@/app/ui/header';
import Footer from '@/app/ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className='px-20 bg-[#EEEEEE]'>
        {children}
      </main>
      <Footer />
    </div>
  );
}