import hero from "../assets/images/hero.png";
import { services } from "../data/test";

function HeroSection() {
  return (
    <div className="md:flex items-center justify-between mb-16 p-4 bg-[#9AD0C2] rounded-2xl">
      <div className="md:w-1/2 flex flex-col items-center justify-center">
        <h1 className="font-medium text-black/80 text-[20px] leading-3 animate-pulse">
          Welcome to
        </h1>
        <p className="font-semibold text-black/90 text-[60px] ">
          Denta Clinic
          <span className=" text-accent animate-pulse">.</span>
        </p>
        <p className="text-sm text-black/90 lg:font-normal text-center">
          Your premier destination for dental care. We understand that visiting
          the dentist can be a stressful experience, which is why our team of
          highly skilled professionals is dedicated to providing you with
          personalized care in a comfortable and welcoming environment.
        </p>
      </div>
      <div className="md:w-1/2 md:pt-0 pt-10">
        <img src={hero} alt="" />
      </div>
    </div>
  );
}

function Service() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
      {services.map((service) => (
        <div
          key={service.title}
          className="flex flex-col min-h-[200px] items-center justify-start px-4 py-4 bg-pearlWhite/70 hover:bg-accent hover:text-white shadow-sm rounded-md"
        >
          <img className="h-10 my-2 bject-cover" src={service.image} alt="" />
          <h1 className="font-medium">{service.title}</h1>
          <p className="text-xs text-center lg:font-thin">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
}
function LandingPage() {
  return (
    <div className="px-6">
      <HeroSection />
      <Service />
    </div>
  );
}

export default LandingPage;
