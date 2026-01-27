import { useEffect, useState } from "react";
import * as playerService from "../../services/playerService";
function PlayersList() {
  const [players, setPlayers] = useState(null);

  async function fetchPlayers() {
    try {
      const data = await playerService.index();
      console.log(data);
      setPlayers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  if (!players) return <h1>Loading...</h1>;

  return (
    <>
      {players.map((p) => (
        <>
          <p>{p.username}</p>
        </>
      ))}
    </>
  );
}

export default PlayersList;
