import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosclient from "../utils/axiosclient";
import { FaFilePdf, FaYoutube } from "react-icons/fa";

function TopicsNotes() {
  const [topics, setTopics] = useState([]);
  const { chaptername } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axiosclient.get(`/topics/${chaptername}/gettopics`);
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopic();
  }, [chaptername]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fw800/background/20240102/pngtree-abstract-cube-mesh-trendy-geometric-vector-pattern-with-blue-and-black-image_13888322.png')",
        }}
      ></div>

      {/* Floating bubbles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-bounce-slow"
          style={{
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      {/* Content */}
      <div className="relative z-10 p-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center drop-shadow-lg">
          {chaptername}
        </h1>

        {topics.length === 0 && (
          <p className="text-center text-gray-300">No topics available.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="relative bg-gradient-to-br from-gray-800/70 to-gray-900/80 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300 group overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl"></div>

              <h2 className="text-2xl font-semibold mb-3 relative z-10">{topic.topicname}</h2>
              <p className="mb-4 text-gray-300 relative z-10 text-sm">{topic.discription}</p>

              {/* Notes */}
              <div className="mb-4 relative z-10">
                <h3 className="font-bold text-lg mb-2">Notes:</h3>
                {topic.notes.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {topic.notes.map((note, index) => (
                      <li
                        key={index}
                        className="flex items-center bg-gray-800/50 px-3 py-2 rounded-xl hover:bg-gray-700/70 transition-colors"
                      >
                        <div className="bg-red-500 p-2 rounded-full mr-3 flex-shrink-0">
                          <FaFilePdf className="text-white text-lg" />
                        </div>
                        <a
                          href={note.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-400 font-medium hover:underline"
                        >
                          {note.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No notes available</p>
                )}
              </div>

              {/* Videos */}
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Videos:</h3>
                {topic.videos.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {topic.videos.map((video, index) => (
                      <li
                        key={index}
                        className="flex items-center bg-gray-800/50 px-3 py-2 rounded-xl hover:bg-gray-700/70 transition-colors"
                      >
                        <div className="bg-red-600 p-2 rounded-full mr-3 flex-shrink-0">
                          <FaYoutube className="text-white text-lg" />
                        </div>
                        <a
                          href={video.videolink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-400 font-medium hover:underline"
                        >
                          {video.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No videos available</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 🧠 AI Chat Box Section — Visible only on this page */}
        <div className="mt-20 flex justify-center">
          <div
            onClick={() => navigate("/ai/chat")}
            className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white rounded-3xl shadow-[0_0_20px_rgba(236,72,153,0.5)] p-8 text-center max-w-md w-full transform hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-2">💬 Need Doubt Support?</h2>
            <p className="text-gray-100 mb-4">
              Ask your AI buddy to explain engineering topics in simple, step-by-step, and friendly language.
            </p>
            <button className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">
              Open AI Chat Box
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 4s infinite;
          }
        `}
      </style>
    </div>
  );
}

export default TopicsNotes;
