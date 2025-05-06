import React, { useState, useEffect } from "react";
import { getSymptoms, checkSymptoms, chatInteract } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bot, CheckCircle, AlertCircle, Info } from "lucide-react";

const SymptomList = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await getSymptoms();
        setSymptoms(response.data.results);
      } catch (err) {
        setError(err.message || "Failed to fetch symptoms");
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, []);

  const handleSymptomChange = (symptomId) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmitSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await checkSymptoms({ symptoms: selectedSymptoms });
      setDiagnosis(response.data);
    } catch (err) {
      setError(err.message || "Failed to check symptoms");
      setDiagnosis(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAiSubmit = async () => {
    if (!message.trim()) {
      setError("Please enter a message about your symptoms.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await chatInteract(message);
      setAiResponse(response.data.response);
    } catch (err) {
      setError(err.message || "Failed to get AI response");
      setAiResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setDiagnosis(null);
    setAiResponse(null);
    setSelectedSymptoms([]);
    setMessage("");
    setError(null);
  };

  const filteredSymptoms = symptoms.filter(
    (symptom) =>
      symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      symptom.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSymptoms = [...filteredSymptoms].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (!localStorage.getItem("token"))
    return (
      <div className="text-center text-red-600 flex items-center justify-center h-screen dark:text-red-400">
        <AlertCircle className="mr-2" />
        Please log in to use the Symptom Checker.
      </div>
    );

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center dark:text-blue-300">
        Symptom Checker
      </h2>

      {/* Symptom Selection */}
      <div className="mb-8 bg-white shadow-md rounded-lg p-6 dark:bg-gray-900 dark:shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center dark:text-white">
          <Info className="mr-2" /> Select Your Symptoms
        </h3>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        {loading && !diagnosis && !aiResponse ? (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block h-8 w-8 text-blue-600 dark:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9h-9" />
              </svg>
            </motion.div>
            <p className="text-gray-600 mt-2 dark:text-gray-400">Loading...</p>
          </div>
        ) : error && !diagnosis && !aiResponse ? (
          <div className="text-center text-red-600 flex items-center justify-center dark:text-red-400">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {sortedSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  selectedSymptoms.includes(symptom.id)
                    ? "bg-blue-100 border-blue-300 shadow-md dark:bg-blue-900 dark:border-blue-500"
                    : "bg-gray-50 border-gray-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom.id)}
                    onChange={() => handleSymptomChange(symptom.id)}
                    className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700"
                  />
                  <span className="text-gray-800 dark:text-white">{symptom.name}</span>
                  {selectedSymptoms.includes(symptom.id) && (
                    <CheckCircle className="ml-2 text-green-500 dark:text-green-400" />
                  )}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            Selected Symptoms:{" "}
            {selectedSymptoms
              .map((id) => symptoms.find((s) => s.id === id)?.name)
              .join(", ")}
          </p>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleSubmitSymptoms}
            disabled={loading}
            className={`px-6 py-2 rounded-full font-semibold text-white transition-colors ${
              loading
                ? "bg-blue-400 dark:bg-blue-500"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            }`}
          >
            {loading ? "Submitting..." : "Submit Symptoms"}
          </button>
          <button
            onClick={() => setSelectedSymptoms([])}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Clear Selection
          </button>
        </div>
      </div>

      {/* AI Interaction */}
      <div className="mb-8 bg-white shadow-md rounded-lg p-6 dark:bg-gray-900 dark:shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center dark:text-white">
          <Bot className="mr-2" /> Or Ask AI About Your Pain
        </h3>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., I am feeling nausea and a mild headache"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            onClick={handleAiSubmit}
            disabled={loading}
            className={`px-6 py-2 rounded-full font-semibold text-white transition-colors ${
              loading
                ? "bg-blue-400 dark:bg-blue-500"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            }`}
          >
            {loading ? "Asking..." : "Ask AI"}
          </button>
        </div>
        {error && !diagnosis && !aiResponse && (
          <div className="text-center text-red-600 flex items-center justify-center dark:text-red-400">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}
      </div>

      {/* Diagnosis Result */}
      <AnimatePresence>
        {(diagnosis || aiResponse) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-white shadow-lg rounded-lg border border-blue-100 dark:bg-gray-900 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-4 dark:text-blue-300">
              Diagnosis Result
            </h3>
            <div className="space-y-6">
              {diagnosis && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Symptom-Based Diagnosis
                  </h4>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h5 className="text-md font-medium text-gray-700 dark:text-gray-300">
                        Conditions
                      </h5>
                      {diagnosis.conditions.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 dark:text-gray-400">
                          {diagnosis.conditions.map((condition) => (
                            <li key={condition.id}>
                              <span className="font-medium text-gray-800 dark:text-white">
                                {condition.name}
                              </span>{" "}
                              (Severity: {condition.severity_display})
                              <p className="text-sm dark:text-gray-300">
                                {condition.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Created:{" "}
                                {new Date(condition.created_at).toLocaleDateString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          No conditions identified.
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600 mt-2 dark:text-gray-400">
                        <span className="font-medium dark:text-white">Urgency: </span>
                        <span
                          className={`capitalize ${
                            diagnosis.diagnosis.urgency === "low"
                              ? "text-green-600 dark:text-green-400"
                              : diagnosis.diagnosis.urgency === "medium"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {diagnosis.diagnosis.urgency}
                        </span>
                      </p>
                      <h5 className="text-md font-medium text-gray-700 mt-4 dark:text-gray-300">
                        Recommendations:
                      </h5>
                      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 dark:text-gray-400">
                        {diagnosis.diagnosis.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 dark:text-gray-400">
                      Check Created:{" "}
                      {new Date(diagnosis.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {aiResponse && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 dark:text-white">
                    AI Analysis
                  </h4>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h5 className="text-md font-medium text-gray-700 dark:text-gray-300">
                        Possible Conditions
                      </h5>
                      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 dark:text-gray-400">
                        {aiResponse.conditions.map((condition, index) => (
                          <li
                            key={index}
                            className="font-medium text-gray-800 dark:text-white"
                          >
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-600 mt-2 dark:text-gray-400">
                        <span className="font-medium dark:text-white">Urgency: </span>
                        <span
                          className={`capitalize ${
                            aiResponse.urgency === "low"
                              ? "text-green-600 dark:text-green-400"
                              : aiResponse.urgency === "medium"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {aiResponse.urgency}
                        </span>
                      </p>
                      <h5 className="text-md font-medium text-gray-700 mt-4 dark:text-gray-300">
                        Recommendations:
                      </h5>
                      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 dark:text-gray-400">
                        {aiResponse.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={clearAll}
                className="px-6 py-2 rounded-full font-semibold text-white bg-gray-500 hover:bg-gray-600 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SymptomList;