import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../Contexts/UserContext";
import {
  Shield,
  Plus,
  Users,
  TrendingUp,
  Trophy,
  Calendar,
  History,
  LogOut,
  Mail,
  Award,
} from "lucide-react";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  // Player Dashboard
  if (user?.role === "Player") {
    return (
      <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-900 text-white py-3 sm:py-4 px-4 sm:px-6 shadow-2xl flex-shrink-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                  <h1 className="text-xl sm:text-2xl md:text-3xl">
                    Player Dashboard
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Welcome back, {user?.username || "Player"}!
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-white/15 hover:bg-white/20 border border-white/25 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1.5 text-xs sm:text-sm transition-colors flex-shrink-0"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Takes remaining height */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full py-3 sm:py-4 flex flex-col gap-3 sm:gap-4">
            {/* Cards Grid - Grows to fill space */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-hidden">
              {/* Player Invites Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 flex flex-col">
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 sm:mb-4">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3">
                    My Invites
                  </h2>
                  <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 flex-1">
                    View club invitations and manage your opportunities to join
                    teams.
                  </p>
                  <Link to={`/players/invites/${user?._id}`}>
                    <button className="bg-white text-blue-600 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg w-full hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      View Invites
                    </button>
                  </Link>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>

              {/* Player Market Card */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 flex flex-col">
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 sm:mb-4">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3">
                    Player Market
                  </h2>
                  <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 flex-1">
                    Explore available players and discover football talent
                    across clubs.
                  </p>
                  <Link to="/players/market">
                    <button className="bg-white text-purple-600 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg w-full hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                      Browse Market
                    </button>
                  </Link>
                </div>
                <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              </div>
            </div>

            {/* Quick Stats Section - Fixed height at bottom */}
            <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 shadow-xl">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-600 p-1.5 sm:p-2 rounded-lg">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/60 text-[10px] sm:text-xs truncate">
                        Role
                      </p>
                      <p className="text-white text-xs sm:text-sm truncate">
                        Player
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/60 text-[10px] sm:text-xs truncate">
                        Status
                      </p>
                      <p className="text-white text-xs sm:text-sm truncate">
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-600 p-1.5 sm:p-2 rounded-lg">
                      <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/60 text-[10px] sm:text-xs truncate">
                        Ready To
                      </p>
                      <p className="text-white text-xs sm:text-sm truncate">
                        Play
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Coach Dashboard (default)
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-900 text-white py-3 sm:py-4 px-4 sm:px-6 shadow-2xl flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                <h1 className="text-xl sm:text-2xl md:text-3xl">
                  Coach Dashboard
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-white/80">
                Welcome back, {user?.username || "Coach"}!
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white/15 hover:bg-white/20 border border-white/25 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1.5 text-xs sm:text-sm transition-colors flex-shrink-0"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Takes remaining height */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full py-3 sm:py-4 flex flex-col gap-3 sm:gap-4">
          {/* Cards Grid - Grows to fill space */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-hidden">
            {/* My Club Card - Only show if user has a club */}
            {user?.club_id && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 flex flex-col">
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 sm:mb-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-1 sm:mb-2">
                    My Club
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 flex-1">
                    View and manage your club's squad, teams, and performance.
                  </p>
                  <Link to={`/club/${user.club_id}`}>
                    <button className="bg-white text-blue-600 px-3 sm:px-4 py-2 rounded-lg w-full hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <Shield className="w-4 h-4" />
                      Manage Club
                    </button>
                  </Link>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </div>
            )}

            {/* Start The Journey Card - Only show if user doesn't have a club */}
            {!user?.club_id && (
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 flex flex-col">
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 sm:mb-3">
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-1 sm:mb-2">
                    Start The Journey
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 flex-1">
                    Start your own football club today! Set up your team and
                    compete.
                  </p>
                  <Link to="/club/create">
                    <button className="bg-white text-green-600 px-3 sm:px-4 py-2 rounded-lg w-full hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <Plus className="w-4 h-4" />
                      Create Club
                    </button>
                  </Link>
                </div>
                <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
              </div>
            )}

            {/* Player Market Card */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 flex flex-col">
              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 sm:mb-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-1 sm:mb-2">
                  Player Market
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 flex-1">
                  Discover top talent! Find skilled footballers ready to join
                  your club.
                </p>
                <Link to="/players/market">
                  <button className="bg-white text-purple-600 px-3 sm:px-4 py-2 rounded-lg w-full hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <TrendingUp className="w-4 h-4" />
                    Scout Players
                  </button>
                </Link>
              </div>
              <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
            </div>

            {/* Create Match Card - Only show if user has a club */}
            {user?.club_id && (
              <div className="bg-gradient-to-br from-orange-600 to-red-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 flex flex-col">
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 sm:mb-3">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-1 sm:mb-2">
                    Create Match
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 flex-1">
                    Schedule new matches between your teams and organize games.
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/club/${user.club_id}/games/create`)
                    }
                    className="bg-white text-orange-600 px-3 sm:px-4 py-2 rounded-lg w-full hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Match
                  </button>
                </div>
                <div className="h-1 bg-gradient-to-r from-orange-400 to-red-600"></div>
              </div>
            )}

            {/* Match History Card - Only show if user has a club */}
            {user?.club_id && (
              <div className="bg-gradient-to-br from-indigo-600 to-violet-800 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 flex flex-col">
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 sm:mb-3">
                    <History className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-1 sm:mb-2">
                    Match History
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 flex-1">
                    View all matches. Track scores and analyze your team's
                    progress.
                  </p>
                  <button
                    onClick={() => navigate(`/club/${user.club_id}/matches`)}
                    className="bg-white text-indigo-600 px-3 sm:px-4 py-2 rounded-lg w-full hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <History className="w-4 h-4" />
                    View Matches
                  </button>
                </div>
                <div className="h-1 bg-gradient-to-r from-indigo-400 to-violet-600"></div>
              </div>
            )}
          </div>

          {/* Quick Stats Section - Fixed height at bottom */}
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 shadow-xl">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/60 text-[10px] sm:text-xs truncate">
                      Status
                    </p>
                    <p className="text-white text-xs sm:text-sm truncate">
                      {user?.club_id ? "Club Owner" : "Free Agent"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="bg-green-600 p-1.5 sm:p-2 rounded-lg">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/60 text-[10px] sm:text-xs truncate">
                      Role
                    </p>
                    <p className="text-white text-xs sm:text-sm truncate">
                      Coach
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-600 p-1.5 sm:p-2 rounded-lg">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/60 text-[10px] sm:text-xs truncate">
                      Ready To
                    </p>
                    <p className="text-white text-xs sm:text-sm truncate">
                      {user?.club_id ? "Lead Team" : "Start"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
