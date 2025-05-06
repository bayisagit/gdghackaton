import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const ViewProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token); // Debug: Log the token

      // Redirect to login if no token is found
      if (!token) {
        console.log("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const apiUrl = `/api/doctors/profiles/${id}/`;
        console.log("Fetching from:", `${import.meta.env.VITE_API_URL}${apiUrl}`); // Debug: Log the full URL
        console.log("Authorization header:", `Bearer ${token}`); // Debug: Log the header

        const response = await api.get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response status:", response.status); // Debug: Log the status
        console.log("Fetched data structure:", JSON.stringify(response.data, null, 2)); // Debug: Log the full structure

        // Handle the response data
        if (typeof response.data === "object" && response.data !== null && response.data.user) {
          setDoctor(response.data);
        } else {
          throw new Error("Unexpected response format: Invalid doctor data");
        }
      } catch (err) {
        console.error("Fetch error:", err.response ? err.response.data : err.message); // Debug: Log the error details
        console.error("Error status:", err.response?.status); // Debug: Log the status code
        if (err.response?.status === 401) {
          console.log("Unauthorized (401), clearing token and redirecting to login");
          localStorage.removeItem("token");
          navigate("/login");
          setError("Session expired or invalid token. Please log in again.");
        } else {
          setError(err.response?.data?.message || err.message || "Failed to fetch doctor profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id, navigate]);

  if (loading) {
    return <div className="container mx-auto py-10 text-center mt-15 text-gray-800 dark:text-white">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-600 dark:text-red-400">Error: {error}</div>;
  }

  if (!doctor) {
    return <div className="container mx-auto py-10 text-center mt-15 text-gray-800 dark:text-white">Doctor not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-15">
      <div className="container mt-6 mx-auto py-10">
        <button
          onClick={() => navigate("/find-doctor")}
          className="mb-4 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Find Doctors
        </button>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>
          <div className="space-y-4">
            <p><strong>ID:</strong> {doctor.id}</p>
            <p><strong>Name:</strong> Dr. {doctor.user.first_name} {doctor.user.last_name}</p>
            <p><strong>Email:</strong> {doctor.user.email}</p>
            <p><strong>Phone:</strong> {doctor.user.phone}</p>
            <p><strong>License Number:</strong> {doctor.license_number}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Consultation Fee:</strong> ${doctor.consultation_fee}</p>
            <p><strong>Available:</strong> {doctor.available ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProfile;
