import { useEffect, useRef, useState } from "react";
import { menuComponents } from "../../../constants";
import CodeHighlighter from "../HighlightJS";
import {
  check,
  copy,
  laptop,
  laptopUnclick,
  menuList,
  phone,
  phoneUnclick,
} from "../../../utils";
import FooterComps from "../FooterComps";

const NavbarFloat = () => {
  const [device, setDevice] = useState(false);
  const [copyCheck, setCopyCheck] = useState(false);
  const [phonePreviewMenu, setPhonePreviewMenu] = useState(false)
  const copyImgRef = useRef(null);
  const copyCode = useRef(null);
  const phonePreviewRef = useRef(null)
  const codes = `<div className="w-full sticky top-0 rounded-full border-2 h-12 flex items-center justify-between bg-white px-6">
  <p className="font-semibold text-lg cursor-pointer">smallFriez</p>
  <ul className="flex gap-x-8">
    <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">Home</li>
    <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">About</li>
    <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">Contact</li>
    <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">Category</li>
  </ul>
</div>`

  const handleDevice = () => {
    setDevice((prev) => !prev);
  };

  useEffect(() => {
    const handleCopyImg = (e) => {
      if (copyImgRef.current.contains(e.target)) {
        navigator.clipboard.writeText(copyCode.current.innerText);
        setCopyCheck(true);
        const timeoutId = setTimeout(() => {
          setCopyCheck(false);
        }, 2000);

        return () => clearTimeout(timeoutId);
      }
    };

    const handlePhonePreviewMenu = (e)=>{
      if(phonePreviewRef.current.contains(e.target)){
        setPhonePreviewMenu(phonePreviewMenu ? false : true)
      }else if(!phonePreviewRef.current.contains(e.target)){
        setPhonePreviewMenu(false)
      }
    }

    document.addEventListener("click", handleCopyImg);
    document.addEventListener("click", handlePhonePreviewMenu);

    return () => {
      document.removeEventListener("click", handleCopyImg);
    };
  }, [phonePreviewMenu]);

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
        <div className="overflow-auto w-full border-2 rounded-lg max-h-[350px] min-h-[350px] bg-[repeating-linear-gradient(0deg,transparent,transparent_0.4em,rgba(0,0,0,0.03)_0.5em),repeating-linear-gradient(90deg,transparent,transparent_0.4em,rgba(0,0,0,0.03)_0.5em)]">
          {device ? (
            <div className="h-[400px]">
              <div className="w-[900px] md:w-full sticky top-0 rounded-full border-2 h-12 flex items-center justify-between bg-white px-6">
                <p className="font-semibold text-lg cursor-pointer">
                  smallFriez
                </p>
                <ul className="flex gap-x-8">
                  <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">
                    Home
                  </li>
                  <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">
                    About
                  </li>
                  <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">
                    Contact
                  </li>
                  <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">
                    Category
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-[400px]">
              <div className="w-[350px] mx-auto sticky top-0 rounded-full border-2 h-12 flex items-center justify-between bg-white px-6">
              <p className="font-semibold text-lg cursor-pointer">
                  smallFriez
                </p>
                <img ref={phonePreviewRef} src={menuList} alt="menu list" className="w-5 cursor-pointer"/>
                <ul className={`flex-col absolute top-9 right-4 px-2 bg-white rounded-lg gap-x-8 ${phonePreviewMenu ? 'flex' : 'hidden'}`}>
                  <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">
                    Home
                  </li>
                  <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">
                    About
                  </li>
                  <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">
                    Contact
                  </li>
                  <li className="text-sm hover:font-medium rounded-full py-2 px-4 cursor-pointer hover:bg-black/10">
                    Category
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <p className="text-xl font-semibold py-5">Code</p>
        <div className="w-full border-2 max-h-96 rounded-lg bg-[#0D1117]">
          <div className="flex justify-between h-10 items-center px-4 rounded-t-lg border-b-[1px] border-white/20 bg-[#1C2433]">
            <p className="text-white text-sm">HTML</p>
            <div
              ref={copyImgRef}
              className="hover:bg-white/10 w-12 rounded-lg justify-center h-7 flex"
            >
              <img
                src={copyCheck ? check : copy}
                alt="copy"
                className={`${copyCheck ? "w-4" : "w-5"} cursor-pointer`}
              />
            </div>
          </div>
          <div className="">
            <CodeHighlighter
              ref={copyCode}
              className=""
              code={codes}
              language="javascript"
            />
          </div>
        </div>
      </div>
      <FooterComps />
    </div>
  );
};

export default NavbarFloat;
