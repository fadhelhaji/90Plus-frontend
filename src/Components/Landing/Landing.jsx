function Landing() {
  return (
    <div className="relative min-h-screen bg-blue-900 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -left-32 bottom-10 w-72 h-72 bg-blue-900/30 rounded-full hidden lg:block" />
      <div className="absolute right-10 -top-40 w-72 h-72 bg-blue-900/30 rounded-full hidden lg:block" />

      {/* Navbar */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black" />
          <span className="text-black text-xl font-semibold tracking-widest">
            FootGame
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-white text-lg font-semibold tracking-wide">
          <span>News</span>
          <span>Live scores</span>
          <span>Leagues & Cups</span>
          <span>Teams</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Image Section */}
        <div className="relative flex justify-center">
          <img
            src="https://placehold.co/400x600"
            alt="App Preview"
            className="w-full max-w-sm lg:max-w-md object-contain"
          />
        </div>

        {/* Right Text Section */}
        <div className="text-center lg:text-left text-white space-y-8">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-widest leading-tight">
            Get Football Updates
          </h1>

          <p className="text-lg lg:text-2xl tracking-wide leading-relaxed text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            habitasse fermentum, elementum.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <button className="bg-blue-500 text-neutral-900 px-10 py-4 rounded-full font-semibold tracking-wide hover:scale-105 transition">
              Download App
            </button>

            <button className="bg-white text-blue-900 px-10 py-4 rounded-full font-semibold tracking-wide hover:scale-105 transition">
              Download App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
