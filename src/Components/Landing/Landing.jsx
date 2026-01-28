import { useNavigate } from "react-router";
import {
  Shield,
  Users,
  Trophy,
  Calendar,
  TrendingUp,
  Star,
  Target,
  Award,
} from "lucide-react";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-6 sm:mb-8">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 p-3 sm:p-4 rounded-full shadow-2xl transform hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              90Plus
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
              Build your dream club. Scout elite players. Dominate the pitch.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <button
                onClick={() => navigate("/auth/sign-up")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base shadow-2xl transform hover:scale-105 transition-all w-full sm:w-auto"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => navigate("/auth/sign-in")}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base shadow-xl transform hover:scale-105 transition-all w-full sm:w-auto"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform">
              <div className="bg-blue-600 p-2 rounded-lg w-fit mb-2">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-white text-sm sm:text-base mb-1">
                Create Your Club
              </h3>
              <p className="text-white/70 text-xs sm:text-sm">
                Build and manage your football empire
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform">
              <div className="bg-purple-600 p-2 rounded-lg w-fit mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-white text-sm sm:text-base mb-1">
                Scout Players
              </h3>
              <p className="text-white/70 text-xs sm:text-sm">
                Discover and recruit top talent
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-orange-600/20 to-red-800/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform">
              <div className="bg-orange-600 p-2 rounded-lg w-fit mb-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-white text-sm sm:text-base mb-1">
                Schedule Matches
              </h3>
              <p className="text-white/70 text-xs sm:text-sm">
                Organize and track your games
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform">
              <div className="bg-green-600 p-2 rounded-lg w-fit mb-2">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-white text-sm sm:text-base mb-1">
                Build Teams
              </h3>
              <p className="text-white/70 text-xs sm:text-sm">
                Create winning formations
              </p>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 px-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="text-white/90 text-xs sm:text-sm">
                Player Ratings
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
              <span className="text-white/90 text-xs sm:text-sm">
                Formation Editor
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
              <span className="text-white/90 text-xs sm:text-sm">
                Match Analytics
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
