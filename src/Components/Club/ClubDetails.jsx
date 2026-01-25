import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import * as clubService from "../../services/clubService";

function ClubDetails() {
  const { id: clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchClubDetails() {
    try {
      const data = await clubService.show(clubId);
      console.log(data);
      setClub(data.club);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeams() {
    try {
      const data = await clubService.indexTeam(clubId);
      console.log(data);
      setTeam(data.teams);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchClubDetails();
    fetchTeams();
  }, [clubId]);

  if (loading) return <p>Loading club details...</p>;
  if (!club) return <p>Club not found</p>;

  const goToTeamForm = () => {
    navigate(`/club/${club._id}/teams/create`);
  };

  return (
    <div>
      <h1>{club.club_name}</h1>
      {team.map((team) => (
        <div key={team._id}>
          <Link to={`/club/${club._id}/teams/${team._id}`}>
            {team.team_name}
          </Link>
        </div>
      ))}

      <button onClick={goToTeamForm}>Create Team</button>
      <p>Coach: {club.coach_id?.username}</p>
      <p>Created at: {new Date(club.created_at).toLocaleDateString()}</p>
    </div>
  );
}

export default ClubDetails;
