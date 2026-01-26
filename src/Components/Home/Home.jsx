function Home() {
  return <>
  <div className="w-full px-2.5 py-[5px] bg-white rounded-[5px] inline-flex justify-between items-center">
  <img className="w-36 h-12" src="https://placehold.co/150x48" />
  <div className="flex justify-end items-center gap-4">
    <div className="p-2.5 flex justify-center items-center gap-2.5">
      <div className="justify-start text-Grays-Black text-3xl font-normal font-['Jersey_25']">Players</div>
    </div>
    <div className="p-2.5 flex justify-center items-center gap-2.5">
      <div className="justify-start text-Grays-Black text-3xl font-normal font-['Jersey_25']">Clubs</div>
    </div>
    <div className="px-4 py-2 bg-black rounded flex justify-center items-center gap-2.5">
      <div className="justify-start text-white text-3xl font-normal font-['Jersey_25']">Sign In</div>
    </div>
    <div className="px-4 py-2 bg-black rounded flex justify-center items-center gap-2.5">
      <div className="justify-start text-white text-3xl font-normal font-['Jersey_25']">Sign Up</div>
    </div>
  </div>
</div>
  </>;
}

export default Home;
