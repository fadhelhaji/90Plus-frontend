import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Save,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import * as gameService from "../../services/gameService";
import * as clubService from "../../services/clubService";

function MatchDetails() {
  const { clubId, gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);

  const [loading, setLoading] = useState(true);
  const [savingScore, setSavingScore] = useState(false);
  const [savingRatings, setSavingRatings] = useState(false);

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const [ratingsDraft, setRatingsDraft] = useState({});

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await gameService.getGameDetails(clubId, gameId);
      const payload = res?.data ? res.data : res;

      setGame(payload);
      setScoreA(payload?.score_team_a ?? 0);
      setScoreB(payload?.score_team_b ?? 0);

      const existing = {};
      (payload?.player_stats || []).forEach((ps) => {
        const pid = ps?.player_id?._id || ps?.player_id;
        if (pid) existing[pid] = ps?.rating ?? "";
      });
      setRatingsDraft(existing);

      const teamAId = payload?.team_a_id?._id || payload?.team_a_id;
      const teamBId = payload?.team_b_id?._id || payload?.team_b_id;

      if (teamAId && teamBId) {
        const [aRes, bRes] = await Promise.all([
          clubService.showTeam(clubId, teamAId),
          clubService.showTeam(clubId, teamBId),
        ]);

        const aPayload = aRes?.data ? aRes.data : aRes;
        const bPayload = bRes?.data ? bRes.data : bRes;

        setTeamA(aPayload?.team || null);
        setTeamB(bPayload?.team || null);
      } else {
        setTeamA(null);
        setTeamB(null);
      }
    } catch (err) {
      console.log(err);
      setGame(null);
      setTeamA(null);
      setTeamB(null);
    } finally {
      setLoading(false);
    }
  }, [clubId, gameId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const teamAPlayers = useMemo(() => {
    return (teamA?.players || [])
      .map((p) => ({
        id: p?.player_id?._id,
        username: p?.player_id?.username,
        position: p?.position,
        team: "A",
      }))
      .filter((x) => x.id);
  }, [teamA]);

  const teamBPlayers = useMemo(() => {
    return (teamB?.players || [])
      .map((p) => ({
        id: p?.player_id?._id,
        username: p?.player_id?.username,
        position: p?.position,
        team: "B",
      }))
      .filter((x) => x.id);
  }, [teamB]);

  const allPlayers = useMemo(() => {
    const seen = new Set();
    const list = [];
    [...teamAPlayers, ...teamBPlayers].forEach((p) => {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        list.push(p);
      }
    });
    return list;
  }, [teamAPlayers, teamBPlayers]);

  const statsByPlayerId = useMemo(() => {
    const m = {};
    (game?.player_stats || []).forEach((ps) => {
      const pid = ps?.player_id?._id || ps?.player_id;
      if (pid) m[pid] = ps;
    });
    return m;
  }, [game?.player_stats]);

  async function handleSaveScore() {
    const a = Number(scoreA);
    const b = Number(scoreB);

    if (Number.isNaN(a) || Number.isNaN(b) || a < 0 || b < 0) {
      alert("Scores must be valid non-negative numbers");
      return;
    }

    setSavingScore(true);
    try {
      await gameService.updateGameScore(clubId, gameId, {
        score_team_a: a,
        score_team_b: b,
      });
      await fetchAll();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Could not update score");
    } finally {
      setSavingScore(false);
    }
  }

  function setRating(playerId, value) {
    setRatingsDraft((prev) => ({ ...prev, [playerId]: value }));
  }

  async function handleSaveAllRatings() {
    setSavingRatings(true);
    try {
      const entries = Object.entries(ratingsDraft).filter(
        ([, rating]) => rating !== "" && rating !== null && rating !== undefined
      );

      for (const [playerId, rating] of entries) {
        const r = Number(rating);
        if (Number.isNaN(r) || r < 0 || r > 5) continue;
        await gameService.ratePlayer(clubId, gameId, playerId, { rating: r });
      }

      await fetchAll();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Could not save ratings");
    } finally {
      setSavingRatings(false);
    }
  }

  async function handleSaveSingleRating(playerId) {
    const r = Number(ratingsDraft[playerId]);
    if (Number.isNaN(r) || r < 0 || r > 5) {
      alert("Rating must be between 0 and 5");
      return;
    }

    try {
      await gameService.ratePlayer(clubId, gameId, playerId, { rating: r });
      await fetchAll();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Could not save rating");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading match...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Match not found</div>
      </div>
    );
  }

  const titleA = teamA?.team_name || game?.team_a_id?.team_name || "Team A";
  const titleB = teamB?.team_name || game?.team_b_id?.team_name || "Team B";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-gradient-to-r from-red-600 to-blue-900 text-white py-10 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="bg-white p-4 rounded-full shadow-xl">
                <Trophy className="w-10 h-10 text-red-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl leading-tight">
                  {titleA} <span className="text-white/80">vs</span> {titleB}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(game.match_date).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{game.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="bg-white/15 hover:bg-white/20 border border-white/25 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-600 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Score</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
              <label className="text-white/80 text-sm">{titleA}</label>
              <input
                type="number"
                min="0"
                className="w-full border border-white/20 bg-white/10 text-white p-3 rounded-lg outline-none"
                value={scoreA}
                onChange={(e) => setScoreA(e.target.value)}
              />
            </div>

            <div className="text-center text-white/80 font-semibold text-xl">
              —
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm">{titleB}</label>
              <input
                type="number"
                min="0"
                className="w-full border border-white/20 bg-white/10 text-white p-3 rounded-lg outline-none"
                value={scoreB}
                onChange={(e) => setScoreB(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleSaveScore}
              disabled={savingScore}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {savingScore ? "Saving..." : "Save Score"}
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl text-white">Player Ratings</h2>
                <p className="text-white/60 text-sm">Rate players out of 5</p>
              </div>
            </div>

            <button
              onClick={handleSaveAllRatings}
              disabled={savingRatings || allPlayers.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {savingRatings ? "Saving..." : "Save All Ratings"}
            </button>
          </div>

          {allPlayers.length === 0 ? (
            <div className="text-white/70">No players found in teams.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allPlayers.map((p) => {
                const saved = statsByPlayerId[p.id]?.rating;
                const draft = ratingsDraft[p.id] ?? (saved ?? "");
                const displayName = p.username || "Unknown";
                const position = p.position || "—";
                const teamLabel = p.team === "A" ? titleA : titleB;

                return (
                  <div
                    key={p.id}
                    className="border border-white/15 bg-white/5 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-white font-semibold text-lg">
                          {displayName}
                        </div>
                        <div className="text-white/60 text-sm">
                          {teamLabel} • Position: {position}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-white/80">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">
                          {saved === undefined ? "—" : saved}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <select
                        className="flex-1 border border-white/20 bg-white/10 text-white p-2 rounded-lg outline-none"
                        value={draft}
                        onChange={(e) => setRating(p.id, e.target.value)}
                      >
                        <option value="">Rate</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <button
                        onClick={() => handleSaveSingleRating(p.id)}
                        disabled={draft === "" || draft === null || draft === undefined}
                        className="bg-white/15 hover:bg-white/20 border border-white/20 text-white px-3 py-2 rounded-lg disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MatchDetails;
