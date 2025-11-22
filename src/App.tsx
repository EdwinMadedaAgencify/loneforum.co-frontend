import { Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/landing";

import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";

import Home from "./pages/home";
import { PersonalAchievements, TrackProgress } from "./pages/milestones";
import { Discussions, LiveChat, SupportGroups } from "./pages/community";
import { CreateJournalEntry, ViewPastEntries } from "./pages/journal";
import {
  StoryHighlights,
  StoryWall,
  SubmitYourStory,
} from "./pages/personal-stories";
import MainLayout from "./layouts/main";

import Landing from "./pages/landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Landing />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="journal">
          <Route path="create" element={<CreateJournalEntry />} />
          <Route path="view" element={<ViewPastEntries />} />
        </Route>
        <Route path="personal-stories">
          <Route path="wall" element={<StoryWall />} />
          <Route path="highlights" element={<StoryHighlights />} />
          <Route path="submit" element={<SubmitYourStory />} />
        </Route>
        <Route path="milestones">
          <Route path="progress" element={<TrackProgress />} />
          <Route path="achievements" element={<PersonalAchievements />} />
        </Route>
        <Route path="community">
          <Route path="discussions" element={<Discussions />} />
          <Route path="support" element={<SupportGroups />} />
          <Route path="chat" element={<LiveChat />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
