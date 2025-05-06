import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import { uploadSkinDiagnosis } from "../services/api";
import { FiUpload, FiRefreshCw, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SkinDiagnosis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(() => {
    const savedCredits = localStorage.getItem("skinDiagnosisCredits");
    return savedCredits ? parseInt(savedCredits, 10) : 20;
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const fileInputRef = useRef(null);
const navigate = useNavigate()
  useEffect(() => {
    localStorage.setItem("skinDiagnosisCredits", credits);
  }, [credits]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please upload an image smaller than 5MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDiagnosis(null);
    setError(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please upload an image smaller than 5MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDiagnosis(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image to upload.");
      return;
    }

    if (credits < 10) {
      setError("Insufficient credits. Please upgrade your package.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      setError(null);
      const response = await uploadSkinDiagnosis(formData);
      setDiagnosis(response.data);
      setCredits((prevCredits) => prevCredits - 10);
    } catch (err) {
      setError(err.message || "Failed to upload image or get diagnosis");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPaymentModal(false);
      setCredits(20);
      localStorage.setItem("skinDiagnosisCredits", 20);
      setError(null);
      alert("Payment successful! Credits have been reset to 20.");
    }, 2000);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDiagnosis(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!localStorage.getItem("token")) {
    return (
      <div className="text-center text-red-600 py-10">
        Please log in to use Skin Diagnosis.
      </div>
    );
  }

  return (
    <div className="container py-10 mt-15">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Skin Condition Diagnosis</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload a clear image of your skin condition to receive an AI-powered
            analysis and recommendations.
          </p>
        </div>

        <div className="mb-6">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-center text-yellow-800">
              <FiInfo className="mr-2" />
              <div>
                <h4 className="font-medium">Important Disclaimer</h4>
                <p className="text-sm">
                  This tool provides preliminary analysis only and is not a
                  substitute for professional medical diagnosis. Always consult
                  with a healthcare professional for proper evaluation and
                  treatment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-blue-100">
            <div className="mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FiUpload className="mr-2 text-blue-600" /> Upload Skin Image
              </h2>
              <p className="text-gray-600 text-sm">
                Upload a clear, well-lit image of the affected skin area. For
                best results, ensure good lighting and focus.
              </p>
            </div>
            <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors" onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
              {!previewUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <FiUpload className="h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium">Drag and drop your image here</h3>
                  <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                    Select Image
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                  <p className="text-xs text-gray-500 mt-2">Supported formats: JPEG, PNG, WebP • Max size: 5MB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-full max-w-md aspect-square">
                    <img src={previewUrl} alt="Selected skin image" className="object-contain rounded-lg" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={resetForm} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition flex items-center">
                      <FiRefreshCw className="mr-2" /> Change Image
                    </button>
                    <button onClick={handleSubmit} disabled={loading || credits < 10} className={`px-4 py-2 rounded-md text-white ${loading || credits < 10 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition flex items-center`}>
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z"></path>
                        </svg>
                      ) : <FiInfo className="mr-2" />}
                      {loading ? "Analyzing..." : "Analyze Image"}
                    </button>
                  </div>
                </div>
              )}
              {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
            </div>
          </div>

          {diagnosis && (
            <div className="bg-white shadow-lg rounded-lg p-6 border border-blue-100">
              <div className="mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiInfo className="mr-2 text-blue-600" /> Diagnosis Results
                </h2>
                <p className="text-gray-600 text-sm">
                  Based on the image analysis, here are the potential findings
                  and recommendations.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Potential Condition</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {diagnosis.diagnosis.conditions[0] || "Unknown condition"}
                    </p>
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <h4 className="text-sm font-medium">Confidence Level</h4>
                        <span className="text-sm">{Math.round(diagnosis.diagnosis.confidence * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${diagnosis.diagnosis.confidence * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-1">Severity</h4>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        diagnosis.diagnosis.urgency === "low" ? "bg-green-100 text-green-800" :
                        diagnosis.diagnosis.urgency === "medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {diagnosis.diagnosis.urgency.charAt(0).toUpperCase() + diagnosis.diagnosis.urgency.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-600">Description based on AI analysis of your skin condition.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recommended Actions</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {diagnosis.diagnosis.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center text-yellow-800">
                  <FiInfo className="mr-2" />
                  <div>
                    <h4 className="font-medium">Important Note</h4>
                    <p className="text-sm">This is an AI-assisted analysis and should not replace professional medical advice.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 p-6 bg-gray-50 border rounded-lg">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Need Professional Help?</h3>
                <p className="text-gray-600 mb-4">
                  Connect with a dermatologist for a thorough evaluation of your
                  skin condition.
                </p>
                <button onClick={()=>navigate('/find-doctor')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Find a Dermatologist
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Learn More</h3>
                <p className="text-gray-600 mb-4">
                  Explore our educational resources about common skin conditions
                  and treatments.
                </p>
                <button onClick={()=>navigate('/education')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
                  Skin Health Articles
                </button>
              </div>
            </div>
          </div>

          {/* Credit Display */}
          <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Free Credits Remaining: 
              </span>
              <span className="text-xl font-semibold text-blue-600">
                 {credits}
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(credits / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Upgrade Prompt */}
          {credits < 10 && (
            <div className="max-w-md mx-auto mt-4 p-4 bg-yellow-100 rounded-lg shadow-md border border-yellow-200">
              <p className="text-yellow-800 text-center">
                Insufficient credits. Please upgrade your package to continue.
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="text-blue-600 underline ml-1"
                >
                  Upgrade Now
                </button>
              </p>
            </div>
          )}

          {/* Payment Modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Upgrade Package
                </h3>
                <p className="text-gray-600 mb-4">
                  Select a payment method to purchase more credits (Fake payment
                  simulation).
                </p>
                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={selectedPaymentMethod === "credit-card"}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="form-radio text-blue-600"
                      disabled={paymentProcessing}
                    />
                    <span className="text-gray-700">Credit Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={selectedPaymentMethod === "paypal"}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="form-radio text-green-600"
                      disabled={paymentProcessing}
                    />
                    <span className="text-gray-700">PayPal</span>
                  </label>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    disabled={paymentProcessing}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePayment}
                    className={`px-4 py-2 rounded-lg text-white flex items-center space-x-2 ${
                      paymentProcessing
                        ? "bg-blue-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    } transition-colors`}
                    disabled={paymentProcessing}
                  >
                    {paymentProcessing ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h-8z"
                          ></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Pay Now</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinDiagnosis;