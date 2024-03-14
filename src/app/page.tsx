import Image from "next/image";


export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden flex items-start flex-col text-white">
        <div className="absolute w-full h-full flex -z-10">
            <div className="absolute w-full h-full z-10 bg-gradient-to-r from-[#111] from-10% to-transparent"/>
            <div className="absolute w-full h-40 z-10 bg-gradient-to-b from-[#111] from-20% to-transparent"/>
            <div className="absolute w-full self-end h-40 z-10 bg-gradient-to-t from-[#111] from-20% to-transparent"/>

            <img src="/images/menubg.jpeg" alt="" className="w-full h-full -z-10" />
        </div>

        <div className="w-full h-full flex items-start flex-col justify-around ml-40">
            <a href="/test" className="text-4xl">
                To Test 1
            </a>

            <a href="/test2" className="text-4xl">
                To Test 2
            </a>
        </div>

    </main>
  );
}