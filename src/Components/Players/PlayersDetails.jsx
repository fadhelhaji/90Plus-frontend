import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../../Contexts/UserContext";
import {
  User,
  Shield,
  Award,
  UserCheck,
  Clock,
  CheckCircle,
  Send,
  ArrowLeft,
} from "lucide-react";
import * as clubService from "../../services/clubService";
import * as playerService from "../../services/playerService";

function PlayersDetails() {
  const [player, setPlayer] = useState(null);
  const [playerClub, setPlayerClub] = useState(null);
  const [inviteStatus, setInviteStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  async function fetchPlayer() {
    try {
      const data = await playerService.show(id);
      setPlayer(data);

      const clubs = await clubService.index();

      const clubWithPlayer = clubs.find((club) =>
        (club.players || []).some((p) => {
          const pid = p?.player_id?._id || p?.player_id;
          return String(pid) === String(id);
        }),
      );

      if (clubWithPlayer) {
        setPlayerClub(clubWithPlayer);

        const statusObj = (clubWithPlayer.players || []).find((p) => {
          const pid = p?.player_id?._id || p?.player_id;
          return String(pid) === String(id);
        });

        setInviteStatus(statusObj?.status || null);
      } else {
        setPlayerClub(null);
        setInviteStatus(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleInvite() {
    if (!user?.club_id) {
      alert("You must have a club to invite players");
      return;
    }

    try {
      await clubService.invitePlayer(user.club_id, player._id);
      setInviteStatus("invited");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">
          Loading player profile...
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">Player not found</div>
      </div>
    );
  }

  const getClubStatus = () => {
    if (playerClub && inviteStatus === "approved") {
      return {
        text: playerClub.club_name,
        subtext: "Current Club",
        icon: Shield,
        color: "from-blue-500 to-blue-700",
        badgeColor: "bg-blue-600",
      };
    } else if (!playerClub) {
      return {
        text: "Free Agent",
        subtext: "Available to join clubs",
        icon: UserCheck,
        color: "from-green-500 to-green-700",
        badgeColor: "bg-green-600",
      };
    } else {
      return {
        text: "Invitation Pending",
        subtext: `${playerClub.club_name}`,
        icon: Clock,
        color: "from-yellow-500 to-yellow-700",
        badgeColor: "bg-yellow-600",
      };
    }
  };

  const clubStatus = getClubStatus();
  const StatusIcon = clubStatus.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-full shadow-xl">
              <User className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">
                {player.username}
              </h1>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  <p className="text-xs sm:text-sm text-white/90">
                    {player.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Player Information */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Role Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="bg-indigo-600 p-2 sm:p-3 rounded-lg">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl text-white">Role</h2>
            </div>
            <p className="text-2xl sm:text-3xl text-white">{player.role}</p>
            <p className="text-sm sm:text-base text-white/60 mt-2">
              Player Position
            </p>
          </div>

          {/* Club Status Card */}
          <div
            className={`bg-gradient-to-br ${clubStatus.color} rounded-xl p-4 sm:p-6 shadow-xl`}
          >
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
                <StatusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl text-white">
                {clubStatus.subtext}
              </h2>
            </div>
            <p className="text-2xl sm:text-3xl text-white">{clubStatus.text}</p>
          </div>
        </div>

        {/* Player Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="bg-purple-600 p-2 sm:p-3 rounded-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl text-white">
              Player Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
              <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">
                Username
              </p>
              <p className="text-base sm:text-lg text-white">
                {player.username}
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
              <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">
                Role
              </p>
              <p className="text-base sm:text-lg text-white">{player.role}</p>
            </div>

            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
              <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">
                Status
              </p>
              <p className="text-base sm:text-lg text-white">
                {clubStatus.text}
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
              <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">
                Availability
              </p>
              <p className="text-base sm:text-lg text-white">
                {!playerClub || inviteStatus !== "approved"
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>

        {/* Coach Actions */}
        {user?.role === "Coach" && user?.club_id && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="bg-green-600 p-2 sm:p-3 rounded-lg">
                <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-white">Coach Actions</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {inviteStatus === "approved" ? (
                <div className="bg-gray-600/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="bg-gray-700 p-3 rounded-full flex-shrink-0 self-start sm:self-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg text-white mb-1">
                        Already in Club
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60">
                        This player is already a member of{" "}
                        {playerClub?.club_name}
                      </p>
                    </div>
                  </div>
                </div>
              ) : inviteStatus === "invited" ? (
                <div className="bg-yellow-600/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-yellow-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="bg-yellow-700 p-3 rounded-full flex-shrink-0 self-start sm:self-center">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg text-white mb-1">
                        Invitation Sent
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60">
                        Waiting for player to accept your invitation
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg transition-all hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  onClick={handleInvite}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Invite to My Club
                </button>
              )}
            </div>
          </div>
        )}

        {/* Not a Coach Message */}
        {user?.role !== "Coach" && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl text-center">
            <div className="bg-white/5 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-white/40" />
            </div>
            <h3 className="text-lg sm:text-xl text-white mb-2">
              Coach Access Only
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              Only coaches can invite players to their clubs
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersDetails;
