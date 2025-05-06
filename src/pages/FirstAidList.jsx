import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getFirstAid, searchFirstAid } from "../services/api";
import NavBar from "../components/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, AlertTriangle, Pill, ArrowRight, Loader2 } from "lucide-react";

const FirstAidList = () => {
  const [firstAidGuides, setFirstAidGuides] = useState([]);
  const [homeRemedies, setHomeRemedies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("firstaid");
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchFirstAidContent = async (query = "") => {
    try {
      setIsLoading(true);
      const response = query ? await searchFirstAid(query) : await getFirstAid();
      const guides = Array.isArray(response.data) ? response.data : response.data.results || [];
      const firstAid = guides.filter((guide) => guide.type === "firstaid" || !guide.type);
      const remedies = guides.filter((guide) => guide.type === "homeremedy");
      setFirstAidGuides(firstAid);
      setHomeRemedies(remedies);

      // Fetch home remedies from the new API endpoint
      const remediesResponse = await fetch(`https://medihelp-backend.onrender.com/api/firstaid/remedies${query ? `?search=${encodeURIComponent(query)}` : ""}`);
      if (!remediesResponse.ok) throw new Error("Failed to fetch remedies");
      const remediesData = await remediesResponse.json();
      setHomeRemedies((prevRemedies) => [...prevRemedies, ...remediesData.results]);
    } catch (err) {
      console.error("Error fetching first aid content:", err);
      setFirstAidGuides([]);
      setHomeRemedies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFirstAidContent();
  }, []);

  const debouncedFetch = debounce((query) => {
    fetchFirstAidContent(query);
  }, 500);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchFirstAidContent();
  };

  const filteredFirstAidGuides = firstAidGuides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHomeRemedies = homeRemedies.filter(
    (remedy) =>
      remedy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.preparation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-10 mt-15 bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <NavBar />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">First Aid & Home Remedies</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access emergency first aid guides and home remedies for common health issues. Always seek professional
            medical help for serious conditions.
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search for first aid guides or remedies..."
            className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-800 dark:bg-gray-900 dark:text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="mb-6">
          <div className="grid w-full grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab("firstaid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition ${
                activeTab === "firstaid"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <AlertTriangle className="h-4 w-4" /> First Aid Guides
            </button>
            <button
              onClick={() => setActiveTab("remedies")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition ${
                activeTab === "remedies"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <Pill className="h-4 w-4" /> Home Remedies
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Loading {activeTab === "firstaid" ? "first aid guides" : "home remedies"}...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "firstaid" && filteredFirstAidGuides.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                <AnimatePresence>
                  {filteredFirstAidGuides.map((guide) => (
                    <motion.div
                      key={guide.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold text-blue-600">{guide.title}</h3>
                          {guide.severity_level_display && (
                            <div
                              className={`px-2 py-1 text-xs rounded-full ${
                                guide.severity_level_display.toLowerCase() === "high"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : guide.severity_level_display.toLowerCase() === "medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              }`}
                            >
                              {guide.severity_level_display}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{guide.description}</p>
                        <div className="mt-4">
                          <Link
                            to={`/first-aid/${guide.id}`}
                            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                          >
                            View Guide
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : activeTab === "remedies" && filteredHomeRemedies.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                <AnimatePresence>
                  {filteredHomeRemedies.map((remedy) => (
                    <motion.div
                      key={remedy.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-green-600">{remedy.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{remedy.preparation}</p>
                        <div className="mt-2 text-gray-600 dark:text-gray-400">
                          <strong>Ingredients:</strong> {remedy.ingredients.join(", ")}
                        </div>
                        {remedy.symptoms.length > 0 && (
                          <div className="mt-2 text-gray-600 dark:text-gray-400">
                            <strong>Symptoms:</strong> {remedy.symptoms.join(", ")}
                          </div>
                        )}
                        <div className="mt-4">
                          <button
                            onClick={() => navigate(`/first-aid/remedies/${remedy.id}`)}
                            className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                          >
                            View Remedy
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-12">
                {activeTab === "firstaid" ? (
                  <AlertTriangle className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                ) : (
                  <Pill className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                )}
                <h3 className="text-lg font-medium mb-2">
                  No {activeTab === "firstaid" ? "guides" : "remedies"} found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  No {activeTab === "firstaid" ? "first aid guides" : "home remedies"} match your search criteria.
                </p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-12 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Emergency?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you're experiencing a medical emergency, please call emergency services immediately.
              </p>
              <button
                onClick={() => (window.location.href = "tel:911")}
                className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Call Emergency Services
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Need Professional Help?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect with healthcare professionals for personalized advice.
              </p>
              <button
                onClick={() => navigate("/find-doctor")}
                className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                Find a Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAidList;