import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../Contexts/UserContext";
import * as clubService from "../../services/clubService";
import * as playerService from "../../services/playerService";

function PlayersDetails() {
  const [player, setPlayer] = useState(null);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  async function fetchPlayer() {
    const data = await playerService.show(id);
    setPlayer(data);
  }

  async function handleInvite() {
    if (!user?.club_id) return alert("You must have a club to invite players");

    try {
      await clubService.invitePlayer(user.club_id, player._id);
      alert("Invitation sent!");
    } catch (err) {
      console.log(err);
      alert("Failed to send invite");
    }
  }

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  if (!player) return <h1>Loading...</h1>;

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">{player.username}</h1>
      <p>Role: {player.role}</p>
      <p>
        Club:{" "}
        {player.club_id ? (
          <span className="font-semibold">{player.club_id.club_name}</span>
        ) : (
          <span className="text-green-600 font-semibold">Free Agent</span>
        )}
      </p>

      {/* Show Invite button only if user is a coach with a club AND player is free agent */}
      {user?.role === "Coach" && user?.club_id && !player.club_id && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleInvite}
        >
          Invite to my club
        </button>
      )}
    </div>
  );
}

export default PlayersDetails;
