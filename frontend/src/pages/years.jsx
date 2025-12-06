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
        console.log("YEAR API RESPONSE:", response.data);

        let result = response.data;

        // Case 1: raw array
        if (Array.isArray(result)) {
          setyeardata(result);
          return;
        }

        // Case 2: { data: [...] }
        if (result.data && Array.isArray(result.data)) {
          setyeardata(result.data);
          return;
        }

        // Case 3: { year: [...] }
        if (result.year && Array.isArray(result.year)) {
          setyeardata(result.year);
          return;
        }

        // If nothing matches
        setyeardata([]);

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
        {yeardata.length > 0 ? (
          yeardata.map((yearObj) => (
            <button
              key={yearObj._id}
              onClick={() => handleYearClick(yearObj.year)}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold shadow-lg transition-all duration-300"
            >
              {yearObj.year}
            </button>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">
            Loading years...
          </p>
        )}
      </div>
    </div>
  );
}

export default Years;
