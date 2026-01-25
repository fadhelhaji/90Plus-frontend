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

  const isCoach = user.role === "Coach";
  const { id } = useParams();

  return (
    <nav>
      <div className="flex justify-center gap-10">
        <div>90Plus</div>

        {/* NOT LOGGED IN */}
        {!isCoach && !user && path === "/" && (
          <div>
            <Link to="/auth/sign-up">Sign Up</Link>
            <Link to="/auth/sign-in">Sign In</Link>
          </div>
        )}
        {isCoach && path === "/home" && (
          <div>
            <Link to="/club">My Club</Link>
            <Link onSubmit={handleSignOut} to="/">
              Sign Out
            </Link>
          </div>
        )}
        {isCoach && path === "/club" && (
          <div>
            <Link to="/home">Home</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
