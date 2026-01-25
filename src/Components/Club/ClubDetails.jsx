import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as clubService from "../../services/clubService";

function ClubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchClubDetails() {
    try {
      const data = await clubService.show(id);
      console.log(data);
      setClub(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClubDetails();
  }, [id]);

  if (loading) return <p>Loading club details...</p>;
  if (!club) return <p>Club not found</p>;

  const goToTeamForm = () => {
    navigate(`/club/${club._id}/teams/create`);
  };

  return (
    <div>
      <button onClick={goToTeamForm}>Create Team</button>
      <h1>{club.club_name}</h1>
      <p>Coach: {club.coach_id?.username}</p>
      <p>Created at: {new Date(club.created_at).toLocaleDateString()}</p>
    </div>
  );
}

export default ClubDetails;
