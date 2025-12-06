import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosclient from "../utils/axiosclient";

function SubjectCard() {
  const { year } = useParams();
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axiosclient.get(`/subject/${year}/getsubject`);
        setSubjects(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSubjects();
  }, [year]);

  const handlechapterlist = (subjectname) => {
    navigate(`/chapter/${subjectname}/getchapters`);
  };

  return (
    <div className="min-h-screen relative text-white py-16 px-6 font-sans overflow-hidden gap-2">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg?t=st=1756830199~exp=1756833799~hmac=b87a29528f7d7480b53ab5227d58898543b29b2b993b27d34b22df22cdf7c8f4&w=1480')`,
          filter: "brightness(0.6)",
        }}
      ></div>

      {/* Optional subtle texture overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-14 pb-13 text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-400 bg-clip-text text-transparent tracking-tight">
          Subjects for {year}
        </h1>

        {subjects.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No subjects found for this year.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {subjects.map((subj) => (
              <div
                key={subj._id}
                onClick={() => handlechapterlist(subj.subjectname)}
                className="relative bg-gray-950 bg-opacity-30 backdrop-blur-md rounded-3xl p-6 text-center shadow-lg hover:shadow-[0_0_30px_#fff] hover:scale-105 transform transition-all duration-300 cursor-pointer"
              >
                {/* Subject image */}
                <img
                  src={`https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010129.jpg?t=st=1756848288~exp=1756851888~hmac=014564d08942500bf6dbffb74e0048387a3afef374e7f2d21d7e34347ef6fbdf&w=1480`}
                  alt={subj.subjectname}
                  className="mx-auto mb-4 w-40 h-28 object-cover rounded-xl shadow-md"
                />

                <h2 className="text-2xl md:text-2xl font-semibold mb-2 text-gray-100">{subj.subjectname}</h2>
                <p className="text-gray-300 text-sm md:text-base">
                  Explore notes, PYQs, and resources for <strong>{subj.subjectname}</strong>.
                </p>

                <button
                  onClick={() => handlechapterlist(subj.subjectname)}
                  className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-pink-500 hover:to-indigo-600 text-white font-semibold shadow-lg transition-all duration-300"
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectCard;
