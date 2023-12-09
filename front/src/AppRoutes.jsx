import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  JoinPage,
  PatientPortal,
  AptConfirmation,
  NotesPage,
  RegisterPage,
  AptSelection,
} from "./pages/index";

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
        <Route path="/apt-selection/" element={<AptSelection />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
