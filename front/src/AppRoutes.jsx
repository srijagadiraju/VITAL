import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  JoinPage,
  PatientPortal,
  AptConfirmation,
  NotesPage,
} from "./pages/index";
import RegisterPage from "./pages/RegisterPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/portal" element={<PatientPortal />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/apt-confirmation/:aptId" element={<AptConfirmation />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
