import { menuComponents } from "../../../constants";
import { laptop } from "../../../utils";

const NavbarFloat = () => {
  return (
    <div className="comps-container">
      <p className="font-semibold text-slate-600">{menuComponents[1].title}</p>
      <h1 className="comps-h1">Navbar Float</h1>
      <p className="comps-desc">Responsive floating navbar</p>
      <p className="text-xl font-semibold">Preview</p>
      <div className="">
        <div className="flex items-center">
          <img src={laptop} alt="laptop" className="w-7"/>
          <p className="text-lg font-medium">PC/Laptop</p>
        </div>
        <div className="w-full border-2 rounded-lg min-h-[350px] bg-[repeating-linear-gradient(0deg,transparent,transparent_5px,rgba(0,0,0,0.101)_6px),repeating-linear-gradient(90deg,transparent,transparent_5px,rgba(0,0,0,0.101)_6px)]">

        </div>
      </div>
    </div>
  );
};

export default NavbarFloat;
