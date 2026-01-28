import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as teamService from "../../services/teamService";

function TeamDetails() {
  const { clubId, teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [clubPlayers, setClubPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [assignedPlayers, setAssignedPlayers] = useState({});
  const [selectedFormation, setSelectedFormation] = useState("");
  const [savingFormation, setSavingFormation] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await teamService.getTeamDetails(clubId, teamId);
      setTeam(res.data.team);
      setClubPlayers(res.data.clubPlayers);
    }
    fetchData();
  }, [clubId, teamId]);

  if (!team) return <p>Loading...</p>;

  const teamPlayerIds = team.players.map((p) => p.player_id._id);

  const availablePlayers = clubPlayers.filter(
    (p) => !teamPlayerIds.includes(p.player_id._id),
  );

  const handleAdd = async () => {
    if (!selectedPlayer) return;

    const res = await teamService.addPlayerToTeam(
      clubId,
      teamId,
      selectedPlayer,
    );

    setTeam(res.data);
    setSelectedPlayer("");
  };

  const handleRemove = async (playerId) => {
    await teamService.removePlayerFromTeam(clubId, teamId, playerId);

    setTeam({
      ...team,
      players: team.players.filter((p) => p.player_id._id !== playerId),
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{team.team_name}</h1>
      <p>Formation: {team.formation}</p>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Formation</label>

        <select
          value={team.formation || ""}
          disabled={savingFormation}
          onChange={async (e) => {
            const newFormation = e.target.value;
            setSavingFormation(true);
            try {
              const updatedTeam = await teamService.updateFormation(
                clubId,
                teamId,
                newFormation,
              );
              setTeam(updatedTeam);
            } catch (err) {
              console.log(err);
              alert("Could not update formation");
            } finally {
              setSavingFormation(false);
            }
          }}
          className="border p-2 rounded w-64"
        >
          <option value="">Select formation</option>
          <option value="1-2-2-1">1-2-2-1</option>
        </select>
      </div>

      <div className="flex gap-3">
        <select
          className="border p-2 rounded"
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          <option value="">Select player</option>

          {availablePlayers.map((p) => (
            <option key={p.player_id._id} value={p.player_id._id}>
              {p.player_id.username}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdd}
          disabled={!selectedPlayer}
          className="bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Team Players</h2>

        {team.players.length === 0 && <p>No players yet</p>}

        {team.players.map((p) => (
          <div
            key={p.player_id._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{p.player_id.username}</span>
            <button
              onClick={() => handleRemove(p.player_id._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamDetails;
