import { useEffect, useState } from "react";
import axiosclient from "../utils/axiosclient";
import { useNavigate, useParams } from "react-router";
import Aisupport from "./aisupport";

function Chaptername() {
  const [chapterlist, setChapterlist] = useState([]);
  const { subjectname } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchchapter = async () => {
      try {
        const response = await axiosclient.get(`/chapter/${subjectname}/getchapters`);
        setChapterlist(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err + " error");
      }
    };
    fetchchapter();
  }, [subjectname]);

  const bubbles = Array.from({ length: 80 });

  // Handle topic click
  const handletopic = (chaptername) => {
    navigate(`/topics/${chaptername}/gettopics`);
  };

  const handleAiclick = () => {
    navigate("/aisupport");
  };

  return (
    <div className="min-h-screen font-sans text-white py-16 px-6 relative bg-gray-900 overflow-hidden">
      {/* Background bubbles */}
      {bubbles.map((_, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-white opacity-20 animate-bubble"
          style={{
            width: `${Math.random() * 15 + 5}px`,
            height: `${Math.random() * 15 + 5}px`,
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 20 + 10}px`,
            animationDuration: `${Math.random() * 15 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      <h1 className="text-5xl md:text-6xl font-extrabold mb-14 text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent tracking-tight">
        Chapters for {subjectname}
      </h1>

      {/* Container with image background */}
      <div
        className="max-w-7xl mx-auto h-[70vh] flex rounded-3xl overflow-hidden shadow-2xl relative"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/b/minimalistic-geometric-shapes-dark-grey-background-create-modern-sophisticated-design-abstract-composition-evokes-346437777.jpg?w=992')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Left: Chapter List */}
        <div className="hide-scrollbar w-1/2 p-6 overflow-y-auto scrollbar-hide flex flex-col gap-4 z-10 relative">
          {chapterlist.length === 0 ? (
            <p className="text-gray-300">No chapters found.</p>
          ) : (
            chapterlist.map((chapter) => (
              <div
                key={chapter._id}
                onClick={() => handletopic(chapter.chaptername)}
                className="mb-6 p-4 rounded-xl hover:shadow-[0_0_20px_#fff] hover:scale-102 transition-all duration-300 cursor-pointer bg-gray-150 bg-opacity-10 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-serif font-bold text-yellow-400 mb-2 drop-shadow-lg">
                  {chapter.chaptername}
                </h2>
                <p className="text-gray-200 text-sm md:text-base drop-shadow">
                  {chapter.discription}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Right half: AI Button */}
        <div className="w-1/2 flex items-center justify-center">
          <button
            onClick={handleAiclick}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition"
          >
            AI Chat Box
          </button>
        </div>
      </div>

      {/* Bubble animation CSS */}
      <style>{`
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-120vh) scale(0.5); opacity: 0; }
        }
        .animate-bubble {
          animation-name: bubble;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

export default Chaptername;
