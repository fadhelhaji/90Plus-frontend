function Home() {
  return <>
<div className="w-full h-full p-2.5 inline-flex flex-col justify-start items-center gap-72 overflow-hidden">
  <div className="self-stretch px-2.5 py-[5px] bg-white rounded-[5px] inline-flex justify-between items-center">
    <img className="w-36 h-12" src="https://placehold.co/150x48" />
    <div className="flex justify-end items-center gap-4">
      <div className="p-2.5 flex justify-center items-center gap-2.5">
        <div className="justify-start text-Grays-Black text-3xl font-normal font-['Jersey_25']">Players</div>
      </div>
      <div className="p-2.5 flex justify-center items-center gap-2.5">
        <div className="justify-start text-Grays-Black text-3xl font-normal font-['Jersey_25']">Clubs</div>
      </div>
      {/* <div className="px-4 py-2 bg-black rounded flex justify-center items-center gap-2.5">
        <div className="justify-start text-white text-3xl font-normal font-['Jersey_25']">Sign In</div>
      </div>
      <div className="px-4 py-2 bg-black rounded flex justify-center items-center gap-2.5">
        <div className="justify-start text-white text-3xl font-normal font-['Jersey_25']">Sign Up</div>
      </div> */}
    </div>
  </div>
<div className="h-80 px-32 py-14 inline-flex justify-center items-center gap-14 overflow-hidden">
  <div className="w-72 h-72 relative">
    <div className="w-72 h-72 left-0 top-0 absolute bg-stone-900 rounded-[5px]" />
    <div className="left-[88px] top-[130px] absolute justify-start text-white text-4xl font-normal font-['Jersey_25']">My Club</div>
    <div className="w-28 h-8 left-[168px] top-[250px] absolute bg-gray-200 rounded-md" />
    <div className="left-[176px] top-[252px] absolute justify-start text-black text-xl font-normal font-['Jersey_25']">Manage Club</div>
  </div>
  <div className="w-72 h-72 relative">
    <div className="w-72 h-72 left-0 top-0 absolute bg-stone-900 rounded-[5px]" />
    <div className="left-[20px] top-[22px] absolute justify-start text-white text-4xl font-normal font-['Jersey_25']">Start The Journey</div>
    <div className="w-28 h-8 left-[168px] top-[250px] absolute bg-gray-200 rounded-md" />
    <div className="left-[180px] top-[252px] absolute justify-start text-black text-xl font-normal font-['Jersey_25']">Create Club</div>
    <div className="w-64 left-[11px] top-[78px] absolute text-center justify-start text-white text-xl font-normal font-['Jersey_25']">Start your own football club today! Set up your team, invite players, and manage your squad to compete at the highest level.</div>
  </div>
  <div className="w-72 h-72 relative">
    <div className="w-72 h-72 left-0 top-0 absolute bg-stone-900 rounded-[5px]" />
    <div className="left-[40px] top-[22px] absolute justify-start text-white text-4xl font-normal font-['Jersey_25']">Player Market</div>
    <div className="w-28 h-8 left-[168px] top-[250px] absolute bg-gray-200 rounded-md" />
    <div className="left-[172px] top-[252px] absolute justify-start text-black text-xl font-normal font-['Jersey_25']">Scout Players</div>
    <div className="w-64 left-[14px] top-[80px] absolute text-center justify-start text-white text-xl font-normal font-['Jersey_25']">Discover top talent in one place! Explore the Player Market to find skilled footballers ready to join your club and make an impact on the pitch.</div>
  </div>
</div>
</div>
  </>;
}

export default Home;
