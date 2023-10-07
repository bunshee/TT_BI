import { HiOutlineFolder } from "react-icons/hi";
import { BiRightArrow } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative h-screen bg-gradient-to-l from-blue-900 to-cyan-600">
      <div className="flex flex-col items-center justify-center h-full">
        <HiOutlineFolder className="text-white text-9xl drop-shadow-lg" />
        <div className="text-6xl font-bold text-white transition-opacity opacity-70 drop-shadow-lg hover:opacity-100">
          Bienvenue à ArcGis Workforce
        </div>
        <div className="flex items-center justify-center mt-10 mb-6 text-xl text-white">
          <p className="w-1/2 text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            maxime sed ad libero quod minima neque, nesciunt corrupti dolor
            quibusdam maiores quis eveniet ipsam, laborum commodi hic nisi,
            pariatur reprehenderit.
          </p>
        </div>
        <NavLink
          to={{ pathname: "/login" }}
          className="px-8 py-4 mt-6 font-bold tracking-wider text-black uppercase bg-white rounded-full shadow-lg hover:scale-110"
        >
          <p className="flex flex-row items-center justify-center gap-3 ">
            Login <BiRightArrow />
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
