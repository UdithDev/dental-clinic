function HeroSection(){
    return(
        <div className="md:flex items-center justify-between mb-16">
            <div className="md:w-1/2 flex flex-col items-center justify-center">
                <h1 className="font-medium text-black/80 text-[20px] leading-3">
                    Welcome to
                </h1>
                <p className="font-semibold text-black/90 text-[60px]">
                    Denta Clinic
                    <span className=" text-accent animate-pulse">.</span>
                </p>
                <p className="text-sm text-black/80 lg:font-thin text-center">
                    Your premier destination for dental care. We understand that visiting
                    the dentist can be a stressful experience, which is why our team of
                    highly skilled professionals is dedicated to providing you with 
                    personalized care in a comfortable and welcoming environment.
                </p>
            </div>
            <div className="">
                <img src="" alt="" />
            </div>

        </div>
    );
}

export default HeroSection