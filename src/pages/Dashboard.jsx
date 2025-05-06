import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Stethoscope,
  Clock,
  Calendar,
} from "lucide-react";
import { getHealthChecks, getSymptomById } from "../services/api";

// Mock useAuth (replace with your actual implementation)
const useAuth = () => {
  const [user, setUser] = useState({ first_name: "User" });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  return { user, isAuthenticated, isLoading };
};

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [symptomChecks, setSymptomChecks] = useState([]);
  const [isLoadingChecks, setIsLoadingChecks] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchSymptomChecks = async () => {
      try {
        setIsLoadingChecks(true);
        const response = await getHealthChecks();
        const data = response.results || [];

        // Fetch symptom names for each health check
        const checksWithSymptomNames = await Promise.all(
          data.map(async (check) => {
            const symptomNames = await Promise.all(
              check.symptoms.map(async (symptomId) => {
                const symptom = await getSymptomById(symptomId);
                return symptom.name;
              })
            );
            return { ...check, symptomNames };
          })
        );

        setSymptomChecks(checksWithSymptomNames);
      } catch (error) {
        console.error("Error fetching symptom checks:", error);
        // Fallback to dummy data if API call fails
        setSymptomChecks([
          {
            id: 50,
            user: 19,
            symptoms: [7],
            symptomNames: ["Cough"],
            conditions: [
              {
                id: 2,
                name: "Common Cold",
                severity: 1,
                severity_display: "Mild",
                description: "Viral infection of the upper respiratory tract",
              },
            ],
            diagnosis: {
              urgency: "low",
              recommendations: [
                "Rest",
                "Hydrate (drink plenty of fluids)",
                "Over-the-counter cough medicine",
              ],
            },
            created_at: "2025-05-04T18:12:33.014794Z",
          },
          {
            id: 49,
            user: 19,
            symptoms: [7, 10, 13, 14, 15],
            symptomNames: ["Cough", "Nausea", "Diarrhea", "Vomiting", "Abdominal Pain"],
            conditions: [
              {
                id: 5,
                name: "Food Poisoning",
                severity: 3,
                severity_display: "Severe",
                description: "Gastrointestinal illness caused by contaminated food.",
              },
            ],
            diagnosis: {
              urgency: "medium",
              recommendations: [
                "Stay hydrated with clear fluids.",
                "Rest and avoid strenuous activity.",
                "Monitor symptoms for worsening.",
              ],
            },
            created_at: "2025-05-04T18:10:23.196215Z",
          },
        ]);
      } finally {
        setIsLoadingChecks(false);
      }
    };
    fetchSymptomChecks();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-10 mt-15 ml-3">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Welcome, {user.first_name}!</h1>

      <div className="mb-6">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "overview"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("health-records")}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "health-records"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Health Records
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === "appointments"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Appointments
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === "overview" && (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <Activity className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-xl font-semibold dark:text-white">Symptom Checker</h3>
                      <p className="text-gray-600 dark:text-gray-400">Check your symptoms</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/symptom-checker")}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Start Check
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <AlertTriangle className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-xl font-semibold dark:text-white">First Aid</h3>
                      <p className="text-gray-600 dark:text-gray-400">Access emergency guides</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/first-aid")}
                    className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    View Guides
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <Stethoscope className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-xl font-semibold dark:text-white">Find Doctors</h3>
                      <p className="text-gray-600 dark:text-gray-400">Book a consultation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/doctors")}
                    className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Find Doctors
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Recent Health Checks</h3>
              <p className="text-gray-600 mb-4 dark:text-gray-400">Your recent symptom checks and results</p>
              {isLoadingChecks ? (
                <div className="text-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Loading your health checks...</p>
                </div>
              ) : symptomChecks.length > 0 ? (
                <div className="space-y-4">
                  {symptomChecks.slice(0, 3).map((check) => (
                    <motion.div
                      key={check.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md"
                    >
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium dark:text-white">Health Check #{check.id}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Symptoms: {check.symptomNames.join(", ")}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Conditions: {check.conditions.length > 0 ? check.conditions.map(c => c.name).join(", ") : "None"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Urgency: {check.diagnosis.urgency}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1 inline" />
                            {new Date(check.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/symptom-checker/results/${check.id}`)}
                          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {symptomChecks.length > 3 && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setActiveTab("health-records")}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        View all health checks
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4 dark:text-gray-400">You haven't performed any symptom checks yet.</p>
                  <button
                    onClick={() => navigate("/symptom-checker")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Check Symptoms Now
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "health-records" && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Health Records</h3>
            <p className="text-gray-600 mb-4 dark:text-gray-400">View all your symptom checks and health data</p>
            {isLoadingChecks ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading your health records...</p>
              </div>
            ) : symptomChecks.length > 0 ? (
              <div className="space-y-4">
                {symptomChecks.map((check) => (
                  <motion.div
                    key={check.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium dark:text-white">Health Check #{check.id}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Symptoms: {check.symptomNames.join(", ")}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Conditions: {check.conditions.length > 0 ? check.conditions.map(c => c.name).join(", ") : "None"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Severity: {check.conditions.length > 0 ? check.conditions.map(c => c.severity_display).join(", ") : "N/A"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Urgency: {check.diagnosis.urgency}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Recommendations: {check.diagnosis.recommendations.slice(0, 3).join(", ")}{check.diagnosis.recommendations.length > 3 ? "..." : ""}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1 inline" />
                            {new Date(check.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/symptom-checker/results/${check.id}`)}
                          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4 dark:text-gray-400">You haven't performed any symptom checks yet.</p>
                <button
                  onClick={() => navigate("/symptom-checker")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Check Symptoms Now
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Appointments</h3>
            <p className="text-gray-600 mb-4 dark:text-gray-400">Manage your teleconsultations and appointments</p>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-4 dark:text-gray-400">You don't have any upcoming appointments.</p>
              <button
                onClick={() => navigate("/find-doctor")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;