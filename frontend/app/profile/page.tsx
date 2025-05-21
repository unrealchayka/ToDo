import Image from "next/image";
import { Navigation } from "@/components/Navigation";
export default function Home() {
  return (

    <div className="w-full h-screen">
      <div className="flex justify-between">
        <Image className="relative left-5 top-0" src='/note.svg' width={100} height={50} alt="note" />
        <Navigation/>
      </div>
      <h1 className="
          text-shadow-red
          relative left-[10%] top-[10%] w-[50%] font-[900] uppercase text-[20px] 
          sm:text-[30px] md:text-[55px] transition-all duration-300
      ">
        Profile page
      </h1>
    </div>
  );
}
