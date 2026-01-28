import { useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { UserContext } from "../../Contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // const isCoach = user.role === "Coach";
  const { id } = useParams();

  return (
    <>
      <div className="w-full h-full p-2.5 inline-flex flex-col justify-start items-center gap-72 overflow-hidden">
        <div className="self-stretch px-2.5 py-[5px] bg-white rounded-[5px] inline-flex justify-between items-center">
          <img className="w-36 h-12" src="https://placehold.co/150x48" />
          <div className="flex justify-end items-center gap-4">
            {user && (
              <Link to="/" onClick={handleSignOut}>
                <div className="p-2.5 flex justify-center items-center gap-2.5">
                  <div className="justify-start text-Grays-Black text-3xl font-normal font-['Jersey_25']">
                    Sign Out
                  </div>
                </div>
              </Link>
            )}
            {user?.role === "Player" && (
              <Link to={`/players/invites/${user._id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  View Invitations
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
