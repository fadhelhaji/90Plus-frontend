import { useContext } from "react";
import { Route, Routes } from "react-router";
import ClubDetails from "./Components/Club/ClubDetails";
import ClubForm from "./Components/Club/ClubForm";
import ClubList from "./Components/Club/ClubList";
import Home from "./Components/Home/Home";
import Landing from "./Components/Landing/Landing";
import Navbar from "./Components/Navbar/Navbar";
import PlayerInvites from "./Components/Players/PlayerInvites";
import PlayersDetails from "./Components/Players/PlayersDetails";
import PlayersList from "./Components/Players/PlayersList";
import TeamDetails from "./Components/Team/TeamDetails";
import TeamForm from "./Components/Team/TeamForm";
import SignInForm from "./Components/User/SignIn/SignInForm";
import SignUpForm from "./Components/User/SignUp/SignUpForm";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
        <Route path="/auth/sign-in" element={<SignInForm />} />
        <Route path="/auth/sign-up" element={<SignUpForm />} />
        <Route path="/club/create" element={<ClubForm />} />
        <Route path="/club" element={<ClubList />} />
        <Route path="/club/:id" element={<ClubDetails />} />
        <Route path="/club/:id/teams/create" element={<TeamForm />} />
        <Route path="/club/:clubId/teams/:teamId" element={<TeamDetails />} />
        <Route path="/players/market" element={<PlayersList />} />
        <Route path="/players/:id" element={<PlayersDetails />} />
        <Route path="/players/invites/:playerId" element={<PlayerInvites />} />
      </Routes>
    </>
  );
}

export default App;
