import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Details/Login/Login";
import Signup from "./components/Auth/Signup";
import SignupFlow from "./components/Auth/Details/Details";
import EmailCheckComponent from "./components/Auth/CheckyourEmail";
import EmailVerificationUI from "./components/Auth/EmailVerified";
import ForgotPassword from "./components/Auth/Forgotpassword";
import SetNewPasswordComponent from "./components/Auth/SetNewPassword";
function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute requireAuth={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-details" element={<SignupFlow />} />
        <Route path="/check-email" element={<EmailCheckComponent />} />
        <Route path="/email-verified" element={<EmailVerificationUI />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<SetNewPasswordComponent />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<Navbar />} />
      </Route>
    </Routes>
  );
}
export default App;