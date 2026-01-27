import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import * as playerService from "../../services/playerService";
function PlayersList() {
  const [players, setPlayers] = useState(null);
  const { id } = useParams();

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
          <Link key={p._id} to={`/players/${p._id}`}>
            <p>{p.username}</p>
          </Link>
        </>
      ))}
    </>
  );
}

export default PlayersList;
