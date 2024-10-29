import { github, light, menuDot, search } from "../utils";

const Navbar = () => {
  return (
    <div className="bg-white w-full border-b-2 border-[#E7E7E9] fixed z-30">
      <div className="w-full px-5 mx:w-[1444px] mx-auto flex justify-between py-3 items-center">
        <div className="">
          <p className="text-3xl font-semibold">smallFries</p>
        </div>
        <div className="hidden gap-x-4 lg:flex">
          <img src={light} className="w-6 h-6" />
          <a href="https://github.com/ArifRTzy" className="">
            <img src={github} className="w-6 h-6" />
          </a>
        </div>
        <div className="flex">
          <img src={search} className="w-6" />
          <img src={menuDot} className="w-6" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
