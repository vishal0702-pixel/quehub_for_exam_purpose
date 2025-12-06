export default function Footer() {
  return (
    <>
      <div className="bg-black text-white py-10">
        {/* Title */}
        <div className="text-4xl font-bold text-center mb-8">
          CONTACT US
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-12">
          {/* Twitter */}
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-[100px] h-[100px] object-cover hover:scale-110    transition-all duration-500 ease-out"
              src="https://img.freepik.com/free-vector/twitter-logo-design_1035-8934.jpg?t=st=1754940939~exp=1754944539~hmac=945476058f5f776380d8f2a91fac8f10f2f0d0735238bbeb8256343af603971d&w=740"
              alt="Twitter"
            />
            <a href="#">Twitter</a>
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-[100px] h-[100px] object-cover hover:scale-110   transition-all duration-500 ease-out"
              src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151299455.jpg?t=st=1754941168~exp=1754944768~hmac=823f456db429bf7fefc69794386139db7912e51f0cff532f0dd6357a301a0d71&w=740"
              alt="LinkedIn"
            />
            <a href="#">LinkedIn</a>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-[100px] h-[100px] object-cover hover:scale-110   transition-all duration-500 ease-out"
              src="https://img.freepik.com/premium-photo/whatsapp-application-green-logo-icon-3d-render-white-background_41204-7055.jpg?ga=GA1.1.1722521065.1748547731&semt=ais_hybrid&w=740&q=80"
              alt="WhatsApp"
            />
            <a href="#">WhatsApp</a>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-[100px] h-[100px] object-cover hover:scale-110   transition-all duration-500 ease-out"
              src="https://img.freepik.com/free-vector/instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728.jpg?ga=GA1.1.1722521065.1748547731&semt=ais_hybrid&w=740&q=80"
              alt="Instagram"
            />
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </>
  );
}