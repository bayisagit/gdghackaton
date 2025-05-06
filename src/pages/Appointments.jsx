import React, { useState } from "react";
import { CalendarIcon, Stethoscope } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex flex-col min-h-screen">
     
      <div className="container mx-auto py-19 flex-grow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Appointments</h1>
        </div>

        <div className="mb-6">
          <button
            className={`mr-2 px-4 py-2 rounded ${activeTab === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-100 text-blue-500 border border-blue-500"}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`mr-2 px-4 py-2 rounded ${activeTab === "book" ? "bg-blue-500 text-white" : "bg-gray-100 text-blue-500 border border-blue-500"}`}
            onClick={() => setActiveTab("book")}
          >
            Book Appointment
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "history" ? "bg-blue-500 text-white" : "bg-gray-100 text-blue-500 border border-blue-500"}`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        <div className="space-y-6">
          {activeTab === "upcoming" && (
            <div className="p-6 w-2xl border rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Dr. John Smith</h3>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center">
                  <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 9.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM3 8v8l2-2h12l2 2V8L17 6H5L3 8zm14 6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                  </svg>
                  Video
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">Thursday, June 15, 2023</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                  </svg>
                  <span className="text-gray-700">10:00 AM</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="border border-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-100">
                  Cancel
                </button>
                <button className="bg-cyan-400 text-white rounded px-4 py-2 hover:bg-cyan-500">
                  Join Call
                </button>
              </div>
            </div>
          )}

          {activeTab === "book" && (
            <div className="p-12 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Book a New Appointment</h3>
              <p className="text-sm text-gray-500">Schedule a consultation with one of our healthcare professionals.</p>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Doctor</label>
                <select className="w-full border border-gray-300 rounded p-2 text-gray-500">
                  <option>Select a doctor</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-cyan-400 text-white rounded px-4 py-2 w-full hover:bg-cyan-500">
                  Book Appointment
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="p-6 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Appointment History</h3>
              <p className="text-sm text-gray-500">View your past appointments and consultations.</p>
              <div className="text-center py-8">
                <Stethoscope className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500">You don't have any past appointments.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer className="w-full mt-auto" />
    </div>
  );
};

export default Appointments;