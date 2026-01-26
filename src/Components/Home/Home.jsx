function Home() {
  return <>
  <div className="w-full px-5 py-[10px] bg-white rounded-[5px] inline-flex justify-between items-center">
  <img className="w-20 h-6" src="https://placehold.co/74x24" />
  <div className="w-72 flex justify-start items-center gap-4">
    <div className="p-2.5 flex justify-center items-center gap-2.5">
      <div className="justify-start text-Grays-Black text-xs font-normal font-['Jersey_25']">Players</div>
    </div>
    <div className="p-2.5 flex justify-center items-center gap-2.5">
      <div className="justify-start text-Grays-Black text-xs font-normal font-['Jersey_25']">Clubs</div>
    </div>
    <div className="px-4 py-2 bg-black rounded flex justify-center items-center gap-2.5">
      <div className="justify-start text-white text-xs font-normal font-['Jersey_25']">Sign In</div>
    </div>
    <div className="px-4 py-2 bg-black rounded flex justify-center items-center gap-2.5">
      <div className="justify-start text-white text-xs font-normal font-['Jersey_25']">Sign Up</div>
    </div>
  </div>
</div>
  </>;
}

export default Home;
