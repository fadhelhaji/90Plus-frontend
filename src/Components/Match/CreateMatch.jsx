import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import * as clubService from "../../services/clubService";
import * as gameService from "../../services/gameService";
import { useNavigate } from "react-router";
import MatchList from "../../components/Match/MatchList";


function CreateMatch() {
  const { clubId } = useParams();
const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    team_a_id: "",
    team_b_id: "",
    match_date: "",
    location: "",
  });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const teamsRes = await clubService.indexTeam(clubId);
      const teamsPayload = teamsRes?.data ? teamsRes.data : teamsRes;
      setTeams(teamsPayload?.teams || []);

      const gamesRes = await gameService.getClubGames(clubId);
      const gamesPayload = gamesRes?.data ? gamesRes.data : gamesRes;
      setGames(gamesPayload || []);
    } catch (err) {
      console.log(err);
      setTeams([]);
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, [clubId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const teamOptions = useMemo(() => {
    return (teams || []).map((t) => ({
      id: t._id,
      name: t.team_name,
    }));
  }, [teams]);

  async function handleCreate(e) {
    e.preventDefault();

    if (
      !form.team_a_id ||
      !form.team_b_id ||
      !form.match_date ||
      !form.location
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.team_a_id === form.team_b_id) {
      alert("Team A and Team B must be different");
      return;
    }

    setCreating(true);
    try {
      await gameService.createGame(clubId, {
        team_a_id: form.team_a_id,
        team_b_id: form.team_b_id,
        match_date: new Date(form.match_date).toISOString(),
        location: form.location,
      });

      setForm({ team_a_id: "", team_b_id: "", match_date: "", location: "" });
      await fetchAll();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Could not create match");
    } finally {
      setCreating(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Match</h1>

      <form
        onSubmit={handleCreate}
        className="border rounded p-4 space-y-4 max-w-lg"
      >
        <div className="space-y-2">
          <label className="block font-semibold">Team A</label>
          <select
            className="border p-2 rounded w-full"
            value={form.team_a_id}
            onChange={(e) =>
              setForm((p) => ({ ...p, team_a_id: e.target.value }))
            }
          >
            <option value="">Select Team A</option>
            {teamOptions.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Team B</label>
          <select
            className="border p-2 rounded w-full"
            value={form.team_b_id}
            onChange={(e) =>
              setForm((p) => ({ ...p, team_b_id: e.target.value }))
            }
          >
            <option value="">Select Team B</option>
            {teamOptions.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Match Date & Time</label>
          <input
            type="datetime-local"
            className="border p-2 rounded w-full"
            value={form.match_date}
            onChange={(e) =>
              setForm((p) => ({ ...p, match_date: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="e.g., Bahrain Polytechnic Field"
            value={form.location}
            onChange={(e) =>
              setForm((p) => ({ ...p, location: e.target.value }))
            }
          />
        </div>

        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create Match"}
        </button>

        {teams.length < 2 && (
          <p className="text-sm text-gray-600">
            You need at least 2 teams to create a match.
          </p>
        )}
      </form>
    </div>
  );
}

export default CreateMatch;
