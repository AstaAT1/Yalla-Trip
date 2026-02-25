import Contact from "./pages/Contact/contact";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/welcome.jsx";
import Home from "./pages/Home/home.jsx";
import Destinations from "./pages/Trajet/trajet.jsx";
import TrajetDetails from "./pages/Trajet/TrajetDetails.jsx";
import About from "./pages/About/about.jsx";
import Community from "./pages/community/partials/community.jsx";
import Login from "./pages/login/partials/loginin.jsx";
import SignUp from "./pages/login/partials/signUp.jsx";
import MarketPlace from "./pages/marketPlace/market.jsx";
import { Provider } from "./context/index.jsx";
import CommunityDetails from "./pages/community/partials/deatlscards.jsx";
import Profile from "./pages/Profile/profile.jsx";
import ErrorPage from "./pages/Error/error.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Provider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loginin" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<TrajetDetails />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/:id" element={<CommunityDetails />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Provider>
    </ThemeProvider>
  );
}
