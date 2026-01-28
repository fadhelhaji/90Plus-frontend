import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as clubService from "../../services/clubService";
import * as playerService from "../../services/playerService";
import { Mail, Check, X, ArrowLeft, Shield, User } from "lucide-react";

function PlayerInvites() {
  const [invites, setInvites] = useState([]);
  const { playerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInvites() {
      try {
        const data = await playerService.getInvitations(playerId);
        setInvites(data);
      } catch (err) {
        console.log("Error fetching invites:", err);
      }
    }
    fetchInvites();
  }, [playerId]);

  const handleAccept = async (clubId) => {
    try {
      await clubService.acceptInvitation(clubId);
      setInvites(invites.filter((inv) => inv._id !== clubId));
      navigate("/home");
    } catch (err) {
      console.log("Error accepting invitation:", err);
    }
  };

  const handleReject = async (clubId) => {
    try {
      await clubService.rejectInvitation(clubId);
      setInvites(invites.filter((inv) => inv._id !== clubId));
    } catch (err) {
      console.log("Error rejecting invitation:", err);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-900 text-white py-3 sm:py-4 px-4 sm:px-6 shadow-2xl flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/15 hover:bg-white/25 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
              <h1 className="text-xl sm:text-2xl md:text-3xl">
                Club Invitations
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-white/80 ml-14">
            {invites.length === 0
              ? "You have no pending invitations"
              : `You have ${invites.length} pending ${
                  invites.length === 1 ? "invitation" : "invitations"
                }`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {invites.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/20 text-center max-w-md">
                <div className="bg-white/10 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Mail className="w-10 h-10 text-white/60" />
                </div>
                <h2 className="text-xl sm:text-2xl text-white mb-3">
                  No Invitations
                </h2>
                <p className="text-white/60 text-sm sm:text-base mb-6">
                  You don't have any club invitations at the moment. Check back
                  later or explore the player market.
                </p>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {invites.map((invite) => (
                <div
                  key={invite._id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Club Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2.5 rounded-lg">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl text-white">
                            {invite.club_name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
                            <User className="w-3.5 h-3.5" />
                            <span>
                              Coach: {invite.coach_id?.username || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => handleAccept(invite._id)}
                        className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 py-2.5 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(invite._id)}
                        className="flex-1 sm:flex-none bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerInvites;
