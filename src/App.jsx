import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Styles
import "./styles/translate.css";

// Components languageselector
import LanguageSelector from "./components/Languageselector";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/AboutUs";
import FirstAidList from "./pages/FirstAidList";
import SymptomList from "./pages/SymptomChecker";
import Home from "./pages/Home";
import SkinDiagnosis from "./pages/SkinDiagnosis";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FindDoctor from "./pages/FindDoctor";
import Dashboard from "./pages/Dashboard";
import Education from "./pages/Education";
import ViewProfile from "./pages/ViewProfile";
import NearbyClinics from "./pages/Clinics";
import Layout from "./Layout";
import Contu from "./pages/Contu";
function App() {
  return (
    <Router>
      {/* 🌍 Language Selector always visible */}
      <LanguageSelector />

      <Routes>
        {/* Routes outside Layout */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Routes inside Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/Contu" element={<Contu />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/find-doctor/:id" element={<ViewProfile />} />
          <Route path="/education" element={<Education />} />
          <Route path="/about" element={<About />} />

          {/* Protected Routes */}
          <Route
            path="/first-aid"
            element={
              <ProtectedRoute>
                <FirstAidList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/symptom-checker"
            element={
              <ProtectedRoute>
                <SymptomList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-doctor"
            element={
              <ProtectedRoute>
                <FindDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-clinic"
            element={
              <ProtectedRoute>
                <NearbyClinics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skin-diagnosis"
            element={
              <ProtectedRoute>
                <SkinDiagnosis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;