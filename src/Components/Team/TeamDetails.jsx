import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import * as teamService from "../../services/teamService";
import { FORMATIONS_6V6 } from "../../utils/formations6v6";
import stadium from "../../assets/Pictures/football-stadium.png";

function TeamDetails() {
  const { clubId, teamId } = useParams();

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

  if (loading) return <p>Loading...</p>;
  if (!team) return <p>Team not found</p>;

  async function handleFormationChange(newFormation) {
    setSavingFormation(true);
    try {
      const updated = await teamService.updateFormation(
        clubId,
        teamId,
        newFormation
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{team.team_name}</h1>

      <div className="space-y-2">
        <label className="block font-semibold">Formation</label>
        <select
          value={team.formation || ""}
          disabled={savingFormation}
          onChange={(e) => handleFormationChange(e.target.value)}
          className="border p-2 rounded w-64"
        >
          <option value="">Select formation</option>
          {Object.keys(FORMATIONS_6V6).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {team.formation ? (
        <div className="space-y-4">
          <div className="relative mx-auto w-[360px] h-[640px] rounded-xl overflow-hidden border">
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

              return (
                <button
                  key={slotName}
                  type="button"
                  onClick={() => {
                    setActiveSlot(slotName);
                    setSelectedPlayerId("");
                  }}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-black rounded-full px-3 py-2 text-sm shadow"
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

          {activeSlot && (
            <div className="border p-4 rounded space-y-3 max-w-md">
              <p className="font-semibold">
                Assign player to{" "}
                <span className="text-blue-600">{activeSlot}</span>
              </p>

              <select
                className="border p-2 rounded w-full"
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(e.target.value)}
              >
                <option value="">Select player</option>
                {availablePlayers.map((p) => {
                  const id = getUserId(p);
                  return (
                    <option key={id} value={id}>
                      {getUsername(p)}
                    </option>
                  );
                })}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={handleAssign}
                  disabled={!selectedPlayerId}
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Assign
                </button>

                <button
                  onClick={() => {
                    setActiveSlot(null);
                    setSelectedPlayerId("");
                  }}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Select a formation to show the pitch.</p>
      )}

      <div className="space-y-2">
        <h2 className="font-semibold">Team Players</h2>

        {team.players?.map((p) => {
          const pid = p?.player_id?._id;
          const uname = p?.player_id?.username || "Unknown";
          const position = p?.position || playerIdToSlot[pid] || "—";

          return (
            <div
              key={pid}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <div className="font-semibold">{uname}</div>
                <div className="text-sm text-gray-600">
                  Position: {position}
                </div>
              </div>

              <button
                onClick={() => handleRemove(pid)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamDetails;
