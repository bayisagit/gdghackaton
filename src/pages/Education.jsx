import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { getArticles, getVideos } from "../services/api";
import { AlertCircle } from "lucide-react";

const Education = () => {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("articles");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Function to extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesResponse, videosResponse] = await Promise.all([getArticles(), getVideos()]);
        const publishedArticles = articlesResponse.data.results.filter(
          (article) => article.is_published
        );
        const publishedVideos = videosResponse.data.results.filter(
          (video) => video.is_published
        );
        setArticles(publishedArticles);
        setVideos(publishedVideos);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch educational content");
      }
    };
    fetchData();
  }, []);

  const filteredContent = () => {
    const query = searchQuery.toLowerCase();
    if (activeTab === "articles") {
      return articles.filter((article) => {
        const tagsString = Array.isArray(article.tags)
          ? article.tags.join(", ").toLowerCase()
          : (article.tags || "").toLowerCase();
        return (
          article.title.toLowerCase().includes(query) ||
          article.summary.toLowerCase().includes(query) ||
          tagsString.includes(query)
        );
      });
    } else {
      return videos.filter((video) =>
        video.title.toLowerCase().includes(query) ||
        (video.related_symptoms || []).some((s) => s.name.toLowerCase().includes(query))
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Health Education</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Explore our collection of articles and videos to learn more about various health topics,
            conditions, and wellness practices.
          </p>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for health topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 bg-white text-gray-800 dark:bg-gray-900 dark:text-white"
            />
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("articles")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "articles"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "videos"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                Videos
              </button>
            </div>
          </div>
          {error && (
            <div className="flex items-center justify-center text-red-500 dark:text-red-400 mb-4">
              <AlertCircle className="mr-2" />
              {error}
            </div>
          )}
          {filteredContent().length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">No {activeTab} available.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredContent().map((item) =>
                activeTab === "articles" ? (
                  <div key={item.id} className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      <span>Published: </span>
                      {new Date(item.published_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{item.summary}</p>
                    {item.tags && (
                      <p className="text-cyan-500 dark:text-cyan-300 text-sm mb-4">
                        {Array.isArray(item.tags) ? item.tags.join(", ") : item.tags}
                      </p>
                    )}
                    <a
                      href="https://en.wikipedia.org/wiki/Health"
                      className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-800 transition"
                    >
                      Read Article →
                    </a>
                  </div>
                ) : (
                  <div key={item.id} className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      <span>Published: </span>
                      {new Date(item.published_date).toLocaleDateString()}
                    </p>
                    {item.related_symptoms?.length > 0 && (
                      <p className="text-cyan-500 dark:text-cyan-300 text-sm mb-4">
                        {item.related_symptoms.map((s) => s.name).join(", ")}
                      </p>
                    )}
                    <div className="relative w-full h-0 pb-[56.25%] mb-4">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${getYouTubeId(item.video_url)}`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Education;
