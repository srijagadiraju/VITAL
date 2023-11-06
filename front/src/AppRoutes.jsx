import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, JoinPage, PatientPortal, AptConfirmation } from "./pages/index";
import RegisterPage from "./pages/RegisterPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/portal/:userId" element={<PatientPortal />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/apt-confirmation/:aptId" element={<AptConfirmation />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
