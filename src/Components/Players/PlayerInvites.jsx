import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as playerService from "../../services/playerService";

function PlayerInvites() {
  const [invites, setInvites] = useState([]);
  const { playerId } = useParams();

  useEffect(() => {
    async function fetchInvites() {
      const data = await playerService.getInvitations(playerId);
      console.log(data);
      setInvites(data);
    }
    fetchInvites();
  }, []);

  if (!invites.length) {
    return <p>No invitations</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Club Invitations</h1>

      {invites.map((club) => (
        <div
          key={club._id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{club.club_name}</p>
            <p className="text-sm text-gray-500">
              Coach: {club.coach_id.username}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Accept
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlayerInvites;
