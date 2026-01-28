import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as gameService from "../../services/gameService";

function MatchList() {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await gameService.getClubGames(clubId);
        const payload = res?.data ? res.data : res;
        setGames(payload || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [clubId]);

  if (loading) return <p>Loading matches...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Matches</h1>

        <button
          onClick={() => navigate(`/club/${clubId}`)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back to Club
        </button>
      </div>

      {games.length === 0 ? (
        <p className="text-gray-600">No matches yet</p>
      ) : (
        <div className="space-y-2">
          {games.map((g) => (
            <div
              key={g._id}
              onClick={() =>
                navigate(`/club/${clubId}/matches/${g._id}`)
              }
              className="border rounded p-3 cursor-pointer hover:bg-gray-100"
            >
              <div className="font-semibold">
                {g.team_a_id?.team_name} vs {g.team_b_id?.team_name}
              </div>
              <div className="text-sm text-gray-600">
                {new Date(g.match_date).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">{g.location}</div>
              <div className="text-sm">
                Score: {g.score_team_a} - {g.score_team_b}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchList;
