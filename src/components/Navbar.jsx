import { useEffect, useRef, useState } from "react";
import { theme } from "../constants";
import { github, light, menuDot, search } from "../utils";

const Navbar = () => {

  const [themes, setThemes] = useState(false)
  const themesRef = useRef(null)
  const lightRef = useRef(null)

  const handleOutsideThemes = (e)=>{
    if(themesRef.current.contains(e.target) || lightRef.current.contains(e.target)){
      setThemes((prev)=> !prev)
    }else if(themes){
      if(!themesRef.current.contains(e.target) || !lightRef.current.contains(e.target)){
        setThemes((prev)=> !prev)
      }
    }
  }

  useEffect(()=>{
    document.addEventListener("click", handleOutsideThemes);
    
    return () => {
      document.removeEventListener("click", handleOutsideThemes)
    } 
  })

  return (
    <div className="bg-white w-full border-b-2 border-[#E7E7E9] fixed z-10">
      <div className="w-full px-5 lg:px-10 mx:w-[1444px] mx-auto flex justify-between py-3 items-center">
        <div className="">
          <p className="text-2xl font-semibold">smallFries</p>
        </div>
        <div className="hidden gap-x-4 lg:flex">
          <div className="relative">
            <img src={light} ref={lightRef} className="w-5 h-5 cursor-pointer"/>
            <div ref={themesRef} className={`flex-col border-2 border-solid w-36 rounded-lg absolute bg-white z-20 top-14 -left-20 shadow-lg ${themes ? 'flex' : "hidden"}`}>
              {theme.map(({ img, text }, i) => (
                <div className={`flex px-2.5 cursor-pointer py-1.5 items-center hover:bg-[#F8FAFC] ${i===0 ? 'rounded-t-lg' : i==2 ? 'rounded-b-lg' : ''}`} key={i}>
                  <img src={img} alt={text} className="w-6" />
                  <p className="text-[#334155] ml-2 font-semibold text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <a href="https://github.com/ArifRTzy" className="">
            <img src={github} className="w-5 h-5" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <img src={search} className="w-5" />
          <img src={menuDot} className="w-6 ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
