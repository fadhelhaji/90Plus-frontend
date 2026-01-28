import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Users, Search, TrendingUp, User, ArrowLeft } from "lucide-react";
import * as playerService from "../../services/playerService";

function PlayersList() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchPlayers() {
    try {
      const data = await playerService.index();
      setPlayers(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">Loading players...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Club
        </button>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2">
                Player Market
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80">
                Discover talented players ready to join your club
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-xl mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search players by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs sm:text-sm">
                  Total Players
                </p>
                <p className="text-lg sm:text-xl text-white">
                  {players.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs sm:text-sm">Available</p>
                <p className="text-lg sm:text-xl text-white">
                  {filteredPlayers.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs sm:text-sm">
                  Search Results
                </p>
                <p className="text-lg sm:text-xl text-white">
                  {filteredPlayers.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="bg-purple-600 p-2 sm:p-3 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">
                Available Players
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredPlayers.map((player) => (
                <Link key={player._id} to={`/players/${player._id}`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl group">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full p-3 sm:p-4 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base text-white truncate mb-1">
                          {player.username}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/60">
                          View Profile →
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 sm:p-12 border border-white/20 shadow-xl text-center">
            <div className="bg-white/5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white/40" />
            </div>
            <h3 className="text-xl sm:text-2xl text-white mb-2">
              No Players Found
            </h3>
            <p className="text-sm sm:text-base text-white/60">
              Try adjusting your search terms to find more players
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersList;
