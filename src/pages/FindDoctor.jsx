import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Search, User, Calendar } from "lucide-react";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const apiUrl = "/api/doctors/profiles";

        const response = await api.get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.results && Array.isArray(response.data.results)) {
          setDoctors(response.data.results);
        } else {
          throw new Error("Unexpected response format: No 'results' array found in response data");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          setError("Session expired or invalid token. Please log in again.");
        } else {
          setError(err.response?.data?.message || err.message || "Failed to fetch doctors");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [navigate]);

  const specializations = [...new Set(doctors.map((doctor) => doctor.specialization))];

  const filteredDoctors = doctors.filter((doctor) => {
    const nameMatch = `${doctor.user.first_name} ${doctor.user.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const specializationMatch = specialization ? doctor.specialization === specialization : true;
    return nameMatch && specializationMatch;
  });

  const handleBookAppointment = async (doctorId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const apiUrl = `/api/doctors/profiles/${doctorId}/`;
      const response = await api.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.user && response.data.user.phone) {
        window.location.href = `tel:${response.data.user.phone}`;
      } else {
        setError("Phone number not available for this doctor.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        setError("Session expired or invalid token. Please log in again.");
      } else {
        setError(err.response?.data?.message || err.message || "Failed to fetch doctor profile");
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto py-10 text-center mt-15 text-gray-800 dark:text-white">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-600 dark:text-red-400 mt-15">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-15">
      <NavBar />
      <div className="container mx-auto py-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Find a Doctor</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect with qualified healthcare professionals for teleconsultations and get the care you need from the comfort of your home.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by doctor name..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-48">
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
              >
                <option value="">Specialization</option>
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Dr. {doctor.user.first_name} {doctor.user.last_name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        doctor.available
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {doctor.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Consultation Fee</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">${doctor.consultation_fee}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBookAppointment(doctor.id)}
                      className={`flex-1 py-2 rounded-lg font-semibold text-white transition-colors ${
                        doctor.available
                          ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                          : "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
                      }`}
                      disabled={!doctor.available}
                    >
                      <Calendar className="inline mr-2 h-4 w-4" />
                      Book Appointment
                    </button>
                    <button
                      onClick={() => navigate(`/find-doctor/${doctor.id}`)}
                      className="flex-1 py-2 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">No doctors found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No doctors match your search criteria. Try adjusting your filters.
              </p>
              {(searchQuery || specialization) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSpecialization("");
                  }}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;
