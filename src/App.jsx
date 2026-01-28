import { Navigate, Route, Routes } from "react-router";
import { useContext } from "react";

import Home from "./Components/Home/Home";
import Landing from "./Components/Landing/Landing";

import SignInForm from "./Components/User/SignIn/SignInForm";
import SignUpForm from "./Components/User/SignUp/SignUpForm";

import ClubForm from "./Components/Club/ClubForm";
import ClubList from "./Components/Club/ClubList";
import ClubDetails from "./Components/Club/ClubDetails";

import TeamForm from "./Components/Team/TeamForm";
import TeamDetails from "./Components/Team/TeamDetails";

import PlayersList from "./Components/Players/PlayersList";
import PlayersDetails from "./Components/Players/PlayersDetails";
import PlayerInvites from "./Components/Players/PlayerInvites";

import CreateMatch from "./Components/Match/CreateMatch";
import MatchDetails from "./Components/Match/MatchDetails";
import MatchList from "./components/Match/MatchList";

import { UserContext } from "./Contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);

  const isCoach = user?.role === "Coach";
  const isPlayer = user?.role === "Player";

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/sign-in" element={<SignInForm />} />
        <Route path="/auth/sign-up" element={<SignUpForm />} />

        {user && (
          <>
            <Route path="/home" element={<Home />} />
            {isCoach && (
              <>
                <Route path="/club" element={<ClubList />} />
                <Route path="/club/create" element={<ClubForm />} />
                <Route path="/club/:id" element={<ClubDetails />} />

                <Route path="/club/:id/teams/create" element={<TeamForm />} />
                <Route
                  path="/club/:clubId/teams/:teamId"
                  element={<TeamDetails />}
                />

                <Route
                  path="/club/:clubId/games/create"
                  element={<CreateMatch />}
                />

                <Route path="/club/:clubId/matches" element={<MatchList />} />
                <Route
                  path="/club/:clubId/matches/:gameId"
                  element={<MatchDetails />}
                />

                <Route path="/players/market" element={<PlayersList />} />
                <Route path="/players/:id" element={<PlayersDetails />} />
              </>
            )}

            {isPlayer && (
              <>
                <Route
                  path="/players/invites/:playerId"
                  element={<PlayerInvites />}
                />
                <Route path="/players/market" element={<PlayersList />} />
                <Route path="/players/:id" element={<PlayersDetails />} />
              </>
            )}
          </>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
