import { github, light } from "../utils";

const Navbar = () => {
  return (
    <div className="bg-white w-full border-b-2 border-[#E7E7E9] fixed z-30">
      <div className="w-[90%] mx-auto flex justify-between py-3 items-center">
        <div className="">
          <p className="text-3xl font-semibold">smallFries</p>
        </div>
        <div className="flex gap-x-4">
          <img src={light} className="w-6 h-6" />
          <a href="https://github.com/ArifRTzy">
            <img src={github} className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
