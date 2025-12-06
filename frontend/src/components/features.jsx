export default function  Featuressection(){
         const features = [
    {
      text: `Access a complete archive of previous year question papers and the most frequently
      asked semester exam questions. This will help you focus on the most important topics and
      prepare up to 10× faster than your peers.`,

      img:`https://img.freepik.com/free-photo/close-up-still-life-hard-exams_23-2149314038.jpg?ga=GA1.1.1722521065.1748547731&semt=ais_hybrid&w=740&q=80
    `},
    {
      text: `Get instant academic assistance through our built-in AI chatbot. Ask questions,
      clarify doubts, and receive explanations in real-time — just like having a tutor available
      24/7.`,
      img:`https://img.freepik.com/free-photo/robot-handshake-human-background-futuristic-digital-age_53876-129770.jpg?ga=GA1.1.1722521065.1748547731&semt=ais_hybrid&w=740&q=80
    `},
    {
      text: `Download and view well-organized notes for every subject. Each set of notes includes
      key topics, chapter summaries, and highlighted important questions to make revision effortless.`,
      img:`https://img.freepik.com/free-photo/adult-female-illustrator-working-tablet-device_23-2149863244.jpg?ga=GA1.1.1722521065.1748547731&semt=ais_hybrid&w=740&q=80
    `},
    {
      text: `Explore a curated section of important questions selected by toppers and professors.
      Perfect for last-minute preparation when you want maximum output in minimal time.`,
      img:`https://img.freepik.com/premium-vector/faqs-concept-illustration_86047-996.jpg?ga=GA1.1.1722521065.1748547731&semt=ais_hybrid&w=740&q=80
   ` },
  ];
    return (<>
    <div className="w-[80vw]  conatiner mx-auto mt-40 mb-40 space-y-10 flex-nowrap justify-between  ">
      {features.map((feature, index) => (
        <div
          key={index}
          className={` flex items-center justify-between border-white border-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-[50px] p-6 text-2xl text-white shadow-lg
             transition-all duration-300 hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] hover:scale-105
             w-[80vw]  mr-10 ml-10`}
        >
          <p className="leading-relaxed w-[40vw] " >{feature.text}</p>

          <div> 
            <img className="w-[254px] h-[200px] object-cover rounded-[50px] "src={feature.img}></img>
          </div>
        </div>

        
      ))}
    </div>
    
     </>
  
         
    )
}