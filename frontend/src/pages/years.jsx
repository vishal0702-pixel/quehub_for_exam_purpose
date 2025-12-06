import { useEffect, useState } from "react";
import axiosclient from "../utils/axiosclient";
import { useNavigate } from "react-router";

function Years() {
  const [yeardata, setyeardata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYear = async () => {
      try {
        const response = await axiosclient.get("/year");
        setyeardata(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error + " error message");
      }
    };

    fetchYear();
  }, []);

  const handleYearClick = (year) => {
    navigate(`/subject/${year}/getsubject`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
        Select Your Academic Year
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {yeardata.map((yearObj) => (
          <button
            key={yearObj._id}
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
