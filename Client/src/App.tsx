import { useAuth } from "@/contexts/AuthProvider";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Login from "./pages/authentications/Login";
import Register from "./pages/authentications/Register";
import Discussions from "./pages/chat/Discussions";
import FriendRequests from "./pages/communications/Friend-requests";
import GuidedMeditation from "./pages/communications/Guided-meditation";
import Mentorship from "./pages/communications/Mentorship";
import SupportGroups from "./pages/communications/SupportGroups";
import InteractiveGames from "./pages/games/Interactive-games";
import Quiz from "./pages/games/Quiz";
import Dashboard from "./pages/journals/Dashboard";
import MoodJournal from "./pages/journals/Mood-journal";
import Notifications from "./pages/journals/Notifications";
import Feed from "./pages/posts/Feed";
import Profile from "./pages/profile/Profile";
import RewardsAndBadges from "./pages/profile/Rewards-and-badges";
import Settings from "./pages/profile/Settings";
import EventCalendar from "./pages/ressources/Event-calendar";
import Menu from "./pages/ressources/Menu";
import PageNotFound from "./pages/ressources/PageNotFound";
import Resources from "./pages/ressources/Resources";

const Authenticate = lazy(() => import("@/pages/authentications/Authenticate"));

export default function App() {
  const { status } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {!status ? (
          <>
            <Route path="/" element={<Feed />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/supportGroups" element={<SupportGroups />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event" element={<EventCalendar />} />
            <Route path="/friends" element={<FriendRequests />} />
            <Route path="/games" element={<InteractiveGames />} />
            <Route path="/guidedMeditation" element={<GuidedMeditation />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/moodJournal" element={<MoodJournal />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/rewards" element={<RewardsAndBadges />} />
            <Route path="/discussions" element={<Discussions />} />
          </>
        ) : (
          <>
            <Route path="/s" element={<Authenticate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}
