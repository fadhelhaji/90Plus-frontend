import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Trophy, Calendar, MapPin, ArrowLeft, Target } from "lucide-react";
import * as gameService from "../../services/gameService";

function MatchList({ games: propGames, onUpdate, embedded = false }) {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(!propGames);

  useEffect(() => {
    // If games are provided as props, use them (embedded mode)
    if (propGames) {
      setGames(propGames);
      setLoading(false);
      return;
    }

    // Otherwise, fetch them (standalone mode)
    async function fetchGames() {
      try {
        const res = await gameService.getClubGames(clubId);
        const payload = res?.data ? res.data : res;
        setGames(payload || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [clubId, propGames]);

  if (loading) {
    if (embedded) {
      return (
        <div className="text-center py-8">
          <div className="text-white/60 text-sm sm:text-base">
            Loading matches...
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">Loading matches...</div>
      </div>
    );
  }

  // Embedded mode (used within CreateMatch or other components)
  if (embedded) {
    if (games.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="bg-white/5 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white/40" />
          </div>
          <p className="text-sm sm:text-base text-white/60">No matches yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {games.map((g) => (
          <div
            key={g._id}
            onClick={() => navigate(`/club/${clubId}/matches/${g._id}`)}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer hover:scale-[1.02] group"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-600 w-2 h-2 rounded-full"></div>
                  <span className="text-sm sm:text-base text-white">
                    {g.team_a_id?.team_name || "Team A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 w-2 h-2 rounded-full"></div>
                  <span className="text-sm sm:text-base text-white">
                    {g.team_b_id?.team_name || "Team B"}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="bg-white/10 px-3 py-1 rounded-lg">
                  <div className="text-lg sm:text-xl text-white">
                    {g.score_team_a ?? 0} - {g.score_team_b ?? 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-white/60">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{new Date(g.match_date).toLocaleString()}</span>
              </div>
              <div className="hidden sm:block text-white/30">•</div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{g.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Standalone page mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Club
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-xl">
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2">Matches</h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80">
                View all scheduled and completed matches
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Stats */}
        {games.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">
                    Total Matches
                  </p>
                  <p className="text-lg sm:text-xl text-white">
                    {games.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">Upcoming</p>
                  <p className="text-lg sm:text-xl text-white">
                    {
                      games.filter((g) => new Date(g.match_date) > new Date())
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs sm:text-sm">Completed</p>
                  <p className="text-lg sm:text-xl text-white">
                    {
                      games.filter((g) => new Date(g.match_date) <= new Date())
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Match List */}
        {games.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 sm:p-12 border border-white/20 shadow-xl text-center">
            <div className="bg-white/5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white/40" />
            </div>
            <h3 className="text-xl sm:text-2xl text-white mb-2">
              No Matches Yet
            </h3>
            <p className="text-sm sm:text-base text-white/60 mb-6">
              Create your first match to get started
            </p>
            <button
              onClick={() => navigate(`/club/${clubId}/create-match`)}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
            >
              Create Match
            </button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="bg-purple-600 p-2 sm:p-3 rounded-lg">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">All Matches</h2>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {games.map((g) => {
                const isUpcoming = new Date(g.match_date) > new Date();

                return (
                  <div
                    key={g._id}
                    onClick={() => navigate(`/club/${clubId}/matches/${g._id}`)}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer hover:scale-[1.02] group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                          <div className="flex items-center gap-2 flex-1">
                            <div className="bg-blue-600 p-2 rounded-lg">
                              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="text-base sm:text-lg text-white">
                              {g.team_a_id?.team_name || "Team A"}
                            </span>
                          </div>

                          <div className="text-white/40 hidden sm:block">
                            VS
                          </div>

                          <div className="flex items-center gap-2 flex-1">
                            <div className="bg-red-600 p-2 rounded-lg">
                              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="text-base sm:text-lg text-white">
                              {g.team_b_id?.team_name || "Team B"}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/60">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>
                              {new Date(g.match_date).toLocaleString()}
                            </span>
                          </div>
                          <div className="hidden sm:block text-white/30">•</div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{g.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-white/20">
                          <div className="text-xl sm:text-2xl text-white text-center">
                            {g.score_team_a ?? 0} - {g.score_team_b ?? 0}
                          </div>
                          <div className="text-xs text-white/40 text-center mt-1">
                            Score
                          </div>
                        </div>

                        {isUpcoming && (
                          <div className="bg-green-600/20 border border-green-500/30 px-3 py-1 rounded-full">
                            <span className="text-xs text-green-400">
                              Upcoming
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchList;
