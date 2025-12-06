export default function About() {
  return (
    <>
      <div className="flex justify-between w-[80vw] container mx-auto gap-4">
        {/* Circle Gradient Graphic */}
        <div className="h-[500px] w-[500px] border-white border-4 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full hover:shadow-[0_0_20px_rgba(236,72,153,0.8)]
          hover:scale-110 transform transition-all duration-500 ease-out overflow-hidden">
          
          <img
            className="h-full w-full object-cover rounded-full"
            src="https://img.freepik.com/free-photo/businessmen-working-strategic-planning_53876-97634.jpg?ga=GA1.1.1722521065.1748547731&semt=ais_hybrid&w=740&q=80"
            alt="Team working"
          />
        </div> 

        {/* About Text */}
        <div className="text-[22px] text-white font-light font-sans w-[50vw] mt-20 leading-relaxed">
          <p>
            We are a group of passionate 3rd-year Computer Science and IT students who built this
            platform as part of our initiative to make exam preparation faster, smarter, and more
            accessible for everyone.  
            <br /><br />
            Our mission is simple — to bring all essential resources like previous year question
            papers, important topics, AI-powered doubt solving, and well-structured notes into one
            convenient place.  
            <br /><br />
            We believe that with the right tools, students can spend less time searching for study
            material and more time focusing on learning. This project is our way of helping you
            study efficiently and succeed with confidence.
          </p>
        </div>
      </div>
    </>
  );
}