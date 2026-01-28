import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  Shield,
  User,
  Users,
  Trophy,
  Calendar,
  Plus,
  ArrowLeft,
} from "lucide-react";
import * as clubService from "../../services/clubService";
import { PlayerCard } from "./UI/PlayerCard";
import { TeamCard } from "./UI/TeamCard";

function ClubDetails() {
  const { id: clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchClubDetails() {
    try {
      const res = await clubService.show(clubId);
      const payload = res?.data ? res.data : res;

      setClub(payload?.club || payload || null);
    } catch (error) {
      console.log(error);
      setClub(null);
    }
  }

  async function fetchTeams() {
    try {
      const res = await clubService.indexTeam(clubId);
      const payload = res?.data ? res.data : res;

      setTeam(payload?.teams || []);
    } catch (error) {
      console.log(error);
      setTeam([]);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchClubDetails(), fetchTeams()]);
      setLoading(false);
    })();
  }, [clubId]);

  const goToTeamForm = () => {
    navigate(`/club/${clubId}/teams/create`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">
          Loading club details...
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">Club not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-gradient-to-r from-red-600 to-blue-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="bg-white p-3 sm:p-4 rounded-full shadow-xl">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-red-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2">
                {club.club_name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Created {new Date(club.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="bg-white/15 hover:bg-white/20 border border-white/25 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg flex items-center gap-2 transition-colors text-sm sm:text-base self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 mt-4 sm:mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-xl mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="bg-blue-600 p-2 sm:p-3 rounded-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl text-white">Head Coach</h2>
          </div>
          <p className="text-2xl sm:text-3xl text-white mb-2">
            {club.coach_id?.username || "No coach assigned"}
          </p>
          <p className="text-sm sm:text-base text-white/60">Club Manager</p>
        </div>

        {team && team.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 p-2 sm:p-3 rounded-lg">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl text-white">Teams</h2>
              </div>
              <button
                onClick={goToTeamForm}
                className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center sm:justify-start gap-2 transition-colors text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Team
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {team.map((t) => (
                <TeamCard key={t._id} team={t} clubId={club._id} />
              ))}
            </div>
          </div>
        )}

        {(!team || team.length === 0) && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 shadow-xl mb-8 sm:mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <div className="bg-purple-600 p-2 sm:p-3 rounded-lg">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">Teams</h2>
            </div>
            <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6">
              No teams created yet
            </p>
            <button
              onClick={goToTeamForm}
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg inline-flex items-center gap-2 transition-colors text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Create Team
            </button>
          </div>
        )}

        {club.players && club.players.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="bg-green-600 p-2 sm:p-3 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">Squad</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {club.players.map((p) => (
                <Link key={p.player_id._id} to={`/players/${p.player_id._id}`}>
                  <PlayerCard player={p.player_id} status={p.status} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {(!club.players || club.players.length === 0) && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 shadow-xl text-center">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <div className="bg-green-600 p-2 sm:p-3 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">Squad</h2>
            </div>
            <p className="text-sm sm:text-base text-white/60">
              No players in the squad yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClubDetails;
