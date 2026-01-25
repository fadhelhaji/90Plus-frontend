import { useState } from "react";
import { useNavigate } from "react-router";
import * as clubService from "../../services/clubService";

function ClubForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    club_name: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await clubService.create(formData);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="club_name">Club Name</label>
        <input
          onChange={handleChange}
          value={formData.club_name}
          type="text"
          name="club_name"
          id="club_name"
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default ClubForm;
