import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as clubService from "../../services/clubService";

function TeamDetails() {
  const { clubId, teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const data = await clubService.showTeam(clubId, teamId);
        setTeam(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, [clubId, teamId]);

  if (loading) return <p>Loading team...</p>;
  if (!team) return <p>Team not found</p>;

  return (
    <div>
      <h1>{team.team_name}</h1>
      <p>Formation: {team.formation || "Not set"}</p>

      <h3>Players</h3>
      {team.players.length > 0 ? (
        team.players.map((p) => (
          <p key={p._id}>
            {p.player_id?.username} – {p.position}
          </p>
        ))
      ) : (
        <p>No players assigned</p>
      )}
    </div>
  );
}

export default TeamDetails;
