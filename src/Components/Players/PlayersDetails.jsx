import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../Contexts/UserContext";
import * as clubService from "../../services/clubService";
import * as playerService from "../../services/playerService";

function PlayersDetails() {
  const [player, setPlayer] = useState(null);
  const [playerClub, setPlayerClub] = useState(null);
  const [inviteStatus, setInviteStatus] = useState(null);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  async function fetchPlayer() {
    const data = await playerService.show(id);
    setPlayer(data);

    const clubs = await clubService.index();

    const clubWithPlayer = clubs.find((club) =>
      club.players.some((p) => p.player_id === id),
    );

    if (clubWithPlayer) {
      setPlayerClub(clubWithPlayer);
      const statusObj = clubWithPlayer.players.find((p) => p.player_id === id);
      setInviteStatus(statusObj.status);
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

  if (!player) return <h1>Loading...</h1>;

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">{player.username}</h1>
      <p>Role: {player.role}</p>
      <p>
        Club:{" "}
        {playerClub && inviteStatus === "approved" ? (
          <span className="font-semibold">{playerClub.club_name}</span>
        ) : !playerClub ? (
          <span className="text-green-600 font-semibold">Free Agent</span>
        ) : (
          <span className="text-yellow-600 font-semibold">
            Invitation Pending ({playerClub.club_name})
          </span>
        )}
      </p>

      {user?.role === "Coach" && user?.club_id && (
        <>
          {inviteStatus === "approved" ? (
            <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
              Already in Club
            </button>
          ) : inviteStatus === "invited" ? (
            <button className="bg-yellow-600 text-white px-4 py-2 rounded cursor-not-allowed">
              Invitation Sent
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleInvite}
            >
              Invite to my club
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PlayersDetails;
