import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as playerService from "../../services/playerService";

function PlayersDetails() {
  const [player, setPlayer] = useState(null);
  const { id } = useParams();

  async function fetchPlayer() {
    const data = await playerService.show(id);
    setPlayer(data);
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
    </div>
  );
}

export default PlayersDetails;
