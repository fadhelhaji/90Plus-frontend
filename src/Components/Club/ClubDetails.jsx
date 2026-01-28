import { Calendar, Plus, Shield, Trophy, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as clubService from "../../services/clubService";
import { PlayerCard } from "./UI/PlayerCard";
import { TeamCard } from "./UI/TeamCard";

function ClubDetails() {
  const { id: clubId } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [team, setTeam] = useState([]);
  const [clubPlayers, setClubPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchClubDetails() {
    try {
      const data = await clubService.show(clubId);
      setClub(data.club);
      setClubPlayers(data.clubPlayers || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeams() {
    try {
      const data = await clubService.indexTeam(clubId);
      setTeam(data.teams);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchClubDetails();
    fetchTeams();
  }, [clubId]);

  const goToTeamForm = () => {
    navigate(`/club/${club._id}/teams/create`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading club details...</div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Club not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-gradient-to-r from-red-600 to-blue-900 text-white py-12 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-white p-4 rounded-full shadow-xl">
              <Shield className="w-16 h-16 text-red-600" />
            </div>
            <div>
              <h1 className="text-5xl mb-2">{club.club_name}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Created {new Date(club.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Head Coach</h2>
          </div>
          <p className="text-3xl text-white mb-2">
            {club.coach_id?.username || "No coach assigned"}
          </p>
          <p className="text-white/60">Club Manager</p>
        </div>

        {team.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl text-white">Teams</h2>
              </div>
              <button
                onClick={goToTeamForm}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Team
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map((t) => (
                <TeamCard key={t._id} team={t} clubId={club._id} />
              ))}
            </div>
          </div>
        )}

        {clubPlayers.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-600 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl text-white">Club Members</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clubPlayers.map((p) => (
                <PlayerCard
                  key={p.player_id._id}
                  player={p.player_id}
                  status={p.status}
                />
              ))}
            </div>
          </div>
        )}

        {clubPlayers.length === 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl text-center">
            <p className="text-white/60">No approved players yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClubDetails;
