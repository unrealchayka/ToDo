import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (

    <div className="w-full h-screen">
      <div className="flex justify-between items-center px-[10%] py-3">
        <Image className="ml-2 mt-2" src='/note.svg' width={100} height={50} alt="note" />
        <ul className="flex text-[15px] sm:text-[25px] md:text-[30px] gap-2 md:gap-5">
          <li className="hover:text-blue-500 transition-colors duration-300"><Link href='/'>Home</Link></li>
          <li className="hover:text-blue-500 transition-colors duration-300"><Link href='/note'>Note Dashboard</Link></li>
          <li className="hover:text-blue-500 transition-colors duration-300"><Link href='/profile'>Profile</Link></li>
        </ul>
      </div>
      <h1 className="
          text-shadow
          relative left-[10%] top-[10%] w-[50%] font-[900] uppercase text-[20px] 
          sm:text-[30px] md:text-[55px] hover:text-green-400 transition-all duration-300
      ">
        home page
      </h1>
    </div>
  );
}
