import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as clubService from "../../services/clubService";
import * as playerService from "../../services/playerService";

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

  if (!invites.length) {
    return <p>No invitations</p>;
  }

  const handleAccept = async (clubId) => {
    try {
      await clubService.acceptInvitation(clubId);
      setInvites(invites.filter((inv) => inv._id !== clubId));
      navigate(`/club/${clubId}`);
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Club Invitations</h1>

      {invites.map((invite) => (
        <div
          key={invite._id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{invite.club_name}</p>
            <p className="text-sm text-gray-500">
              Coach: {invite.coach_id?.username || "N/A"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleAccept(invite._id)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(invite._id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlayerInvites;
