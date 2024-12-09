import { useState } from "react";
import { menuComponents } from "../../../constants";
import CodeHighlighter from "../HighlightJS";
import {
  copy,
  laptop,
  laptopUnclick,
  phone,
  phoneUnclick,
} from "../../../utils";
import FooterComps from "../FooterComps";

const NavbarFloat = () => {
  const [device, setDevice] = useState(false);

  const handleDevice = () => {
    setDevice((prev) => !prev);
  };

  return (
    <div className="comps-container">
      <p className="font-semibold text-slate-600">{menuComponents[1].title}</p>
      <h1 className="comps-h1">Navbar Float</h1>
      <p className="comps-desc">Responsive floating navbar</p>
      <div className="">
        <p className="text-xl font-semibold py-5">Preview</p>
        <div className="flex mb-2">
          <div
            onClick={handleDevice}
            className={`flex items-center h-10 w-32 justify-center rounded-lg gap-x-1 cursor-pointer ${
              device ? "bg-zinc-200" : "text-slate-500"
            }`}
          >
            <img
              src={device ? laptop : laptopUnclick}
              alt="laptop"
              className="w-5"
            />
            <p className="text-sm font-semibold">PC/Laptop</p>
          </div>
          <div
            onClick={handleDevice}
            className={`flex items-center w-32 h-10 rounded-lg justify-center gap-x-1 cursor-pointer ${
              !device ? "bg-zinc-200" : "text-slate-500"
            }`}
          >
            <img
              src={device ? phoneUnclick : phone}
              alt="laptop"
              className="w-5"
            />
            <p className="text-sm font-semibold">Phone</p>
          </div>
        </div>
        <div className="w-full border-2 rounded-lg min-h-[350px] bg-[repeating-linear-gradient(0deg,transparent,transparent_0.4em,rgba(0,0,0,0.03)_0.5em),repeating-linear-gradient(90deg,transparent,transparent_0.4em,rgba(0,0,0,0.03)_0.5em)]">
          {device ? <div>ha</div> : <div>hi</div>}
        </div>
      </div>
      <div className="">
        <p className="text-xl font-semibold py-5">Code</p>
        <div className="w-full border-2 h-96 rounded-lg bg-[#0D1117]">
          <div className="flex justify-between py-3 px-4 rounded-lg border-b-[1px] border-white/20 bg-[#1C2433]">
            <p className="text-white text-sm">JSX</p>
            <img src={copy} alt="copy" className="w-5" />
          </div>
          <div className="">
            <CodeHighlighter className="" code={
              "const x = 10;\nlet y = 78"

            } language="javascript"/>
          </div>
        </div>
      </div>
      <FooterComps/>
    </div>
  );
};

export default NavbarFloat;
