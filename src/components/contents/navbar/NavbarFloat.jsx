import { menuComponents } from "../../../constants";

const NavbarFloat = () => {
  return (
    <div className="comps-container">
      <p className="font-semibold text-slate-600">{menuComponents[1].title}</p>
      <h1 className="comps-h1">Navbar Float</h1>
      <p className="comps-desc">Responsive floating navbar</p>
      <div className="">
        <div className="">
          <img src="" alt="" />
          <p className="text-xl font-semibold">Preview</p>
        </div>
        <div className="w-full border-2 rounded-lg min-h-[350px] bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,rgba(0,0,0,0.3)_11px),repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.3)_11px)]">

        </div>
      </div>
    </div>
  );
};

export default NavbarFloat;
