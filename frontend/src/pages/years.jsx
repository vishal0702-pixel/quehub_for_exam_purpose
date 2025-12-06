import { useEffect, useState } from "react";
import axiosclient from "../utils/axiosclient";
import { useNavigate } from "react-router";

function Years() {
  const [yeardata, setYeardata] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYear = async () => {
      try {
        const response = await axiosclient.get("/year");
        console.log("YEAR API RESPONSE:", response.data);

        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setYeardata(response.data);
        } else {
          console.error("Expected array but got:", response.data);
          setYeardata([]);
        }
      } catch (error) {
        console.error("Error fetching years:", error);
        setYeardata([]);
      } finally {
        setLoading(false);
      }
    };

    fetchYear();
  }, []);

  const handleYearClick = (year) => {
    navigate(`/subject/${year}/getsubject`);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (yeardata.length === 0) return <div className="text-white text-center mt-20">No years found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
        Select Your Academic Year
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {yeardata.map((yearObj) => (
          <button
            key={yearObj._id || yearObj.year}
            onClick={() => handleYearClick(yearObj.year)}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold shadow-lg transition-all duration-300"
          >
            {yearObj.year}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Years;
