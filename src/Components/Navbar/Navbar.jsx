import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
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

  return (
    <nav>
      <div className="flex justify-center">
        <div>90Plus</div>

        {/* NOT LOGGED IN */}
        {!user && path === "/" && (
          <div>
            <Link to="/auth/sign-up">Sign Up</Link>
            <Link to="/auth/sign-in">Sign In</Link>
          </div>
        )}
      </div>

      {/* LOGGED IN */}
      {user && (
        <div>
          <span>Hello, {user.username}</span>

          {/* Links depending on page */}
          {path === "/home" && (
            <>
              <Link to="/club">My Club</Link>
              <Link to="/club/create">Create Club</Link>
            </>
          )}
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
