function Home() {
  return (
    <>
      <div className="w-[1440px] h-[900px] bg-white inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="self-stretch px-[517px] py-6 bg-neutral-600 inline-flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-white text-6xl font-normal font-['Jersey_25']">
            90Plus
          </div>
        </div>
        <div className="self-stretch h-[640px] flex flex-col justify-center items-center gap-2.5 overflow-hidden">
          <div className="w-96 h-80 relative overflow-hidden">
            <div className="w-96 h-80 left-[1.50px] top-0 absolute bg-zinc-300 rounded-[33px]" />
            <div className="w-36 h-8 left-[242.50px] top-[284px] absolute bg-stone-600 rounded-md" />
            <div className="w-96 h-64 left-[28.50px] top-[16px] absolute overflow-hidden">
              <div className="left-[51px] top-0 absolute justify-start text-black text-6xl font-normal font-['Jersey_25']">
                Club Name
              </div>
            </div>
            <div className="w-36 h-8 left-[244.50px] top-[284px] absolute overflow-hidden">
              <div className="left-[24px] top-[-1px] absolute justify-start text-white text-3xl font-normal font-['Jersey_25']">
                Manage
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
