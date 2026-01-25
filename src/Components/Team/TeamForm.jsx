import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as clubService from "../../services/clubService";

function TeamForm() {
  const { id: clubId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    team_name: "",
    formation: "",
    players: [],
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await clubService.createTeam(clubId, formData);
      navigate(`/club/${clubId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Team Name</label>
      <input
        type="text"
        name="team_name"
        value={formData.team_name}
        onChange={handleChange}
      />

      <label>Formation</label>
      <input
        type="text"
        name="formation"
        value={formData.formation}
        onChange={handleChange}
      />

      <button type="submit">Create Team</button>
    </form>
  );
}

export default TeamForm;
