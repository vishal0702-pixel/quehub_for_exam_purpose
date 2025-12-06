import Featuressection from "./features";
import About from "./about";
import Footer from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, BookOpen, FileText, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { logoutUser } from "../authsllice";

export default function Landingpage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlelogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {/* Background */}
      <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">
        {/* Navbar */}
        <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            ?QueHUB
          </h1>

          <nav className="flex items-center gap-6 text-sm font-medium">
            {["Home", "About", "Features"].map((item) => (
              <button
                key={item}
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="relative flex items-center gap-4" ref={dropdownRef}>
            {!isAuthenticated || !user ? (
              <>
                <a
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium"
                >
                  Sign Up
                </a>
                <a
                  href="/login"
                  className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors text-white font-medium"
                >
                  Login
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium flex items-center gap-1"
                >
                  {user?.firstname || "User"} ▾
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700">
                    <button
                      onClick={handlelogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 text-center py-28">
          <h2 className="text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              ?QueHUB
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Why search around when everything you need is right here?  
            Discover notes, PYQs, and resources in one hub.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <button
              onClick={() => navigate("/year")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition font-semibold shadow-md"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/ai/chat")}
              className="relative group px-10 py-4 rounded-full font-bold text-lg text-white 
                         bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                         shadow-[0_0_20px_rgba(236,72,153,0.5)]
                         transition-transform duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                Meet <span className="text-yellow-300">Neo</span> – Your AI Study Buddy 🚀
              </span>
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_70%)] animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_2s_linear_infinite]"></div>
              <style>
                {`
                @keyframes shine {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
                `}
              </style>
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold text-center mb-14">
            Why Choose <span className="text-indigo-400">?QueHUB</span>?
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <BookOpen className="w-10 h-10 text-indigo-400" />,
                title: "Organized Notes",
                desc: "Access structured and cleanly formatted study notes tailored to your needs.",
              },
              {
                icon: <FileText className="w-10 h-10 text-pink-400" />,
                title: "PYQ Access",
                desc: "Find previous year questions quickly and boost your exam preparation.",
              },
              {
                icon: <Users className="w-10 h-10 text-purple-400" />,
                title: "Community Driven",
                desc: "Join a hub of learners sharing knowledge and collaborating together.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-gray-800 transition"
              >
                {feature.icon}
                <h4 className="text-xl font-semibold mt-4">{feature.title}</h4>
                <p className="text-gray-400 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Us Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              At <span className="text-indigo-400 font-semibold">?QueHUB</span>, 
              our mission is simple: to bring together all the resources students need in one place.  
              No more scattered notes, lost links, or endless searching.  
              We are building a <strong>hub of accessibility and collaboration</strong> for learners everywhere.
            </p>
            <ul className="mt-6 space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" /> Trusted by students across universities
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" /> Easy-to-use interface for quick access
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" /> Built for the community, by the community
              </li>
            </ul>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-2xl"></div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-950 border-t border-gray-800 py-6 flex justify-center items-center text-gray-400 text-sm">
        {isAuthenticated && user ? (
          <span>Welcome, {user.firstname} 👋</span>
        ) : (
          <span>© 2025 QueHUB. Luxury learning, simplified.</span>
        )}
      </div>
    </>
  );
}
