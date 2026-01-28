import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Trophy,
  Calendar,
  MapPin,
  Shield,
  ArrowLeft,
  Plus,
  AlertCircle,
} from "lucide-react";
import * as clubService from "../../services/clubService";
import * as gameService from "../../services/gameService";
import MatchList from "../../components/Match/MatchList";

function CreateMatch() {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    team_a_id: "",
    team_b_id: "",
    match_date: "",
    location: "",
  });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const teamsRes = await clubService.indexTeam(clubId);
      const teamsPayload = teamsRes?.data ? teamsRes.data : teamsRes;
      setTeams(teamsPayload?.teams || []);

      const gamesRes = await gameService.getClubGames(clubId);
      const gamesPayload = gamesRes?.data ? gamesRes.data : gamesRes;
      setGames(gamesPayload || []);
    } catch (err) {
      console.log(err);
      setTeams([]);
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [clubId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const teamOptions = useMemo(() => {
    return (teams || []).map((t) => ({
      id: t._id,
      name: t.team_name,
    }));
  }, [teams]);

  async function handleCreate(e) {
    e.preventDefault();

    if (
      !form.team_a_id ||
      !form.team_b_id ||
      !form.match_date ||
      !form.location
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.team_a_id === form.team_b_id) {
      alert("Team A and Team B must be different");
      return;
    }

    setCreating(true);
    try {
      await gameService.createGame(clubId, {
        team_a_id: form.team_a_id,
        team_b_id: form.team_b_id,
        match_date: new Date(form.match_date).toISOString(),
        location: form.location,
      });

      setForm({ team_a_id: "", team_b_id: "", match_date: "", location: "" });
      await fetchAll();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Could not create match");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2">
                Create Match
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80">
                Schedule matches between your teams
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Create Match Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="bg-orange-600 p-2 sm:p-3 rounded-lg">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">New Match</h2>
            </div>

            {teams.length < 2 && (
              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-200">
                    You need at least 2 teams to create a match.
                  </p>
                  <button
                    onClick={() => navigate(`/club/${clubId}`)}
                    className="text-sm text-yellow-300 hover:text-yellow-100 underline mt-1"
                  >
                    Go create teams first
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4 sm:space-y-6">
              {/* Team A */}
              <div>
                <label className="block text-sm sm:text-base text-white/80 mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    Team A
                  </div>
                </label>
                <select
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  value={form.team_a_id}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, team_a_id: e.target.value }))
                  }
                >
                  <option value="" className="bg-slate-800">
                    Select Team A
                  </option>
                  {teamOptions.map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-800">
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Team B */}
              <div>
                <label className="block text-sm sm:text-base text-white/80 mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    Team B
                  </div>
                </label>
                <select
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  value={form.team_b_id}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, team_b_id: e.target.value }))
                  }
                >
                  <option value="" className="bg-slate-800">
                    Select Team B
                  </option>
                  {teamOptions.map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-800">
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Match Date & Time */}
              <div>
                <label className="block text-sm sm:text-base text-white/80 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    Match Date & Time
                  </div>
                </label>
                <input
                  type="datetime-local"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  value={form.match_date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, match_date: e.target.value }))
                  }
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm sm:text-base text-white/80 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    Location
                  </div>
                </label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., Bahrain Polytechnic Field"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={creating || teams.length < 2}
                className="w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white px-6 py-3 sm:py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
              >
                {creating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Match
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Match List */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl lg:max-h-[800px] lg:overflow-y-auto">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="bg-purple-600 p-2 sm:p-3 rounded-lg">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">
                Scheduled Matches
              </h2>
            </div>

            <MatchList games={games} onUpdate={fetchAll} embedded={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMatch;
