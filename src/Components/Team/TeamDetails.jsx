import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Shield,
  Users,
  Grid3x3,
  UserPlus,
  X,
  ArrowLeft,
  Trash2,
  RefreshCw,
} from "lucide-react";
import * as teamService from "../../services/teamService";
import { FORMATIONS_6V6 } from "../../utils/formations6v6";
import stadium from "../../assets/Pictures/football-stadium.png";

function TeamDetails() {
  const { clubId, teamId } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [clubPlayers, setClubPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingFormation, setSavingFormation] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [slotAssignments, setSlotAssignments] = useState({});

  const getUserId = (obj) => obj?.player_id?._id || obj?._id;
  const getUsername = (obj) =>
    obj?.player_id?.username || obj?.username || "Unknown";

  const playerIdToSlot = useMemo(() => {
    const map = {};
    Object.entries(slotAssignments).forEach(([slot, pid]) => {
      if (pid) map[pid] = slot;
    });
    return map;
  }, [slotAssignments]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await teamService.getTeamDetails(clubId, teamId);
      const payload = res?.data ? res.data : res;

      const fetchedTeam = payload?.team || null;
      setTeam(fetchedTeam);
      setClubPlayers(payload?.clubPlayers || []);

      if (fetchedTeam?.players) {
        const restoredSlots = {};
        fetchedTeam.players.forEach((p) => {
          if (p.position && p.player_id?._id) {
            restoredSlots[p.position] = p.player_id._id;
          }
        });
        setSlotAssignments(restoredSlots);
      }
    } catch (err) {
      console.log(err);
      setTeam(null);
      setClubPlayers([]);
    } finally {
      setLoading(false);
    }
  }, [clubId, teamId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const teamPlayerIds = useMemo(() => {
    if (!team?.players) return [];
    return team.players.map((p) => p?.player_id?._id).filter(Boolean);
  }, [team]);

  const availablePlayers = useMemo(() => {
    return (clubPlayers || []).filter((p) => {
      const id = getUserId(p);
      return id && !teamPlayerIds.includes(id);
    });
  }, [clubPlayers, teamPlayerIds]);

  const formationSlots = useMemo(() => {
    const f = team?.formation;
    return f ? FORMATIONS_6V6[f] || [] : [];
  }, [team?.formation]);

  async function handleFormationChange(newFormation) {
    setSavingFormation(true);
    try {
      const updated = await teamService.updateFormation(
        clubId,
        teamId,
        newFormation,
      );
      const payload = updated?.data ? updated.data : updated;
      setTeam(payload);
      setActiveSlot(null);
      setSelectedPlayerId("");
      setSlotAssignments({});
    } catch (err) {
      console.log(err);
      alert("Could not update formation");
    } finally {
      setSavingFormation(false);
    }
  }

  async function handleAssign() {
    if (!activeSlot || !selectedPlayerId) return;
    try {
      await teamService.addPlayerToTeam(clubId, teamId, {
        playerId: selectedPlayerId,
        position: activeSlot,
      });

      setSlotAssignments((prev) => ({
        ...prev,
        [activeSlot]: selectedPlayerId,
      }));

      setActiveSlot(null);
      setSelectedPlayerId("");
      await fetchData();
    } catch (err) {
      console.log(err);
      alert("Could not assign player");
    }
  }

  async function handleRemove(playerId) {
    try {
      await teamService.removePlayerFromTeam(clubId, teamId, playerId);
      setSlotAssignments((prev) => {
        const next = { ...prev };
        for (const [slot, pid] of Object.entries(next)) {
          if (pid === playerId) delete next[slot];
        }
        return next;
      });
      await fetchData();
    } catch (err) {
      console.log(err);
      alert("Could not remove player");
    }
  }

  function getClubUsernameById(id) {
    const found = (clubPlayers || []).find((p) => getUserId(p) === id);
    return found ? getUsername(found) : "Unknown";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">
          Loading team details...
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl">Team not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(`/club/${clubId}`)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Club
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-xl">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2">
                {team.team_name}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/80">
                Formation Editor & Squad Management
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Formation Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-xl mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-600 p-2 sm:p-3 rounded-lg">
              <Grid3x3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl text-white">Formation</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <select
              value={team.formation || ""}
              disabled={savingFormation}
              onChange={(e) => handleFormationChange(e.target.value)}
              className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
            >
              <option value="" className="bg-slate-800">
                Select formation
              </option>
              {Object.keys(FORMATIONS_6V6).map((f) => (
                <option key={f} value={f} className="bg-slate-800">
                  {f}
                </option>
              ))}
            </select>

            {savingFormation && (
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Updating...</span>
              </div>
            )}
          </div>
        </div>

        {team.formation ? (
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Pitch View */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-xl">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="bg-green-600 p-2 sm:p-3 rounded-lg">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl text-white">
                  Formation View
                </h2>
              </div>

              <div className="relative mx-auto w-full max-w-[360px] aspect-[9/16] rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src={stadium}
                  alt="Pitch"
                  className="w-full h-full object-cover pointer-events-none"
                />

                {formationSlots.map((pos, idx) => {
                  const slotName =
                    pos?.slot ||
                    pos?.name ||
                    pos?.position ||
                    pos?.label ||
                    `SLOT_${idx}`;

                  const assignedPlayerId = slotAssignments[slotName];
                  const label = assignedPlayerId
                    ? getClubUsernameById(assignedPlayerId)
                    : "+";

                  const isAssigned = !!assignedPlayerId;

                  return (
                    <button
                      key={slotName}
                      type="button"
                      onClick={() => {
                        setActiveSlot(slotName);
                        setSelectedPlayerId("");
                      }}
                      className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm shadow-lg transition-all hover:scale-110 ${
                        isAssigned
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : "bg-white/95 hover:bg-white text-black"
                      } ${activeSlot === slotName ? "ring-4 ring-blue-400" : ""}`}
                      style={{
                        top: pos.top ?? "50%",
                        left: pos.left ?? "50%",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs sm:text-sm text-white/60 text-center mt-4">
                Click on a position to assign a player
              </p>
            </div>

            {/* Assignment Panel or Team Players */}
            <div className="space-y-6 sm:space-y-8">
              {activeSlot && (
                <div className="bg-blue-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-500/30 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 p-2 sm:p-3 rounded-lg">
                        <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl text-white">
                          Assign Player
                        </h2>
                        <p className="text-xs sm:text-sm text-white/60">
                          Position: {activeSlot}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveSlot(null);
                        setSelectedPlayerId("");
                      }}
                      className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/80 mb-2">
                        Select Available Player
                      </label>
                      <select
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={selectedPlayerId}
                        onChange={(e) => setSelectedPlayerId(e.target.value)}
                      >
                        <option value="" className="bg-slate-800">
                          Select player
                        </option>
                        {availablePlayers.map((p) => {
                          const id = getUserId(p);
                          return (
                            <option
                              key={id}
                              value={id}
                              className="bg-slate-800"
                            >
                              {getUsername(p)}
                            </option>
                          );
                        })}
                      </select>
                      {availablePlayers.length === 0 && (
                        <p className="text-xs text-white/50 mt-2">
                          No available players. All club players are assigned.
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleAssign}
                        disabled={!selectedPlayerId}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Team Players List */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="bg-purple-600 p-2 sm:p-3 rounded-lg">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl text-white">Team Squad</h2>
                </div>

                {team.players && team.players.length > 0 ? (
                  <div className="space-y-3">
                    {team.players.map((p) => {
                      const pid = p?.player_id?._id;
                      const uname = p?.player_id?.username || "Unknown";
                      const position =
                        p?.position || playerIdToSlot[pid] || "—";

                      return (
                        <div
                          key={pid}
                          className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="text-sm sm:text-base text-white truncate">
                                {uname}
                              </div>
                              <div className="text-xs sm:text-sm text-white/60">
                                Position: {position}
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemove(pid)}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 sm:px-3 sm:py-2 rounded-lg transition-colors flex items-center gap-2 flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline text-sm">
                                Remove
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-white/5 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white/40" />
                    </div>
                    <p className="text-sm sm:text-base text-white/60">
                      No players assigned yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 sm:p-12 border border-white/20 shadow-xl text-center">
            <div className="bg-white/5 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Grid3x3 className="w-8 h-8 sm:w-10 sm:h-10 text-white/40" />
            </div>
            <h3 className="text-xl sm:text-2xl text-white mb-2">
              No Formation Selected
            </h3>
            <p className="text-sm sm:text-base text-white/60">
              Select a formation above to start building your team
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamDetails;
