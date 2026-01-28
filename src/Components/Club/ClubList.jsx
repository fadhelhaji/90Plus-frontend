import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../Contexts/UserContext";
import { Shield, Search, Trophy, Plus, User } from "lucide-react";
import * as clubService from "../../services/clubService";

function ClubList() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchClubs() {
    if (!user) return;
    try {
      const data = await clubService.index();
      setClubs(data || []);
    } catch (error) {
      console.log("Failed to fetch clubs:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClubs();
  }, [user]);

  const filteredClubs = clubs.filter((club) =>
    club.club_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 shadow-xl text-center max-w-md">
          <div className="bg-white/5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-white/40" />
          </div>
          <h2 className="text-xl sm:text-2xl text-white mb-2">
            Sign In Required
          </h2>
          <p className="text-sm sm:text-base text-white/60">
            Please sign in to see clubs
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">Loading clubs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2">
                  Football Clubs
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white/80">
                  Explore all registered football clubs
                </p>
              </div>
            </div>

            {user?.role === "Coach" && !user?.club_id && (
              <button
                onClick={() => navigate("/club/create")}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xl text-sm sm:text-base whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Club
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Search Bar */}
        {clubs.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-xl mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search clubs by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        {/* Stats Bar */}
        {clubs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">
                    Total Clubs
                  </p>
                  <p className="text-lg sm:text-xl text-white">
                    {clubs.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">Showing</p>
                  <p className="text-lg sm:text-xl text-white">
                    {filteredClubs.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">
                    Search Results
                  </p>
                  <p className="text-lg sm:text-xl text-white">
                    {filteredClubs.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="bg-blue-600 p-2 sm:p-3 rounded-lg">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">All Clubs</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredClubs.map((club) => (
                <Link key={club._id} to={`/club/${club._id}`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl group">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full p-3 sm:p-4 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base text-white truncate mb-1">
                          {club.club_name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>
                            {club.players?.length || 0}{" "}
                            {club.players?.length === 1 ? "Player" : "Players"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {club.coach_id && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-white/40">Coach</p>
                        <p className="text-xs sm:text-sm text-white/80 truncate">
                          {club.coach_id.username || "Unknown"}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : clubs.length > 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 sm:p-12 border border-white/20 shadow-xl text-center">
            <div className="bg-white/5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white/40" />
            </div>
            <h3 className="text-xl sm:text-2xl text-white mb-2">
              No Clubs Found
            </h3>
            <p className="text-sm sm:text-base text-white/60 mb-6">
              Try adjusting your search terms to find more clubs
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 sm:p-12 border border-white/20 shadow-xl text-center">
            <div className="bg-white/5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white/40" />
            </div>
            <h3 className="text-xl sm:text-2xl text-white mb-2">
              No Clubs Yet
            </h3>
            <p className="text-sm sm:text-base text-white/60 mb-6">
              Be the first to create a football club!
            </p>
            {user?.role === "Coach" && (
              <button
                onClick={() => navigate("/club/create")}
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Your Club
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClubList;
