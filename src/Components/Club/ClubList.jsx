import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../../Contexts/UserContext";
import * as clubService from "../../services/clubService";

function ClubList() {
  const { user } = useContext(UserContext);
  const [club, setClub] = useState([]);

  async function fetchClubs() {
    if (!user) return; // make sure user is logged in
    try {
      const data = await clubService.index();
      setClub(data);
    } catch (error) {
      console.log("Failed to fetch clubs:", error);
    }
  }

  useEffect(() => {
    fetchClubs();
  }, [user]);

  if (!user) return <p>Please sign in to see your club.</p>;
  return (
    <>
      <div>
        {club.length > 0 ? (
          club.map((club) => (
            <Link key={club._id} to={`/club/${club._id}`}>
              <p>Club Name: {club.club_name}</p>
            </Link>
          ))
        ) : (
          <p>No Club found</p>
        )}
      </div>
    </>
  );
}

export default ClubList;
