import { Link, Outlet } from "react-router-dom";
import {
  dropdown,
  menuList,
  search,
  code,
  close,
  codeWhite,
  dropdownWhite,
} from "../utils";
import { useEffect, useRef, useState } from "react";
import { menuComponents, searchMenu } from "../constants";

const Sidebar = () => {
  const [searchShow, setSearchShow] = useState(false);
  const [bold, setBold] = useState({ group: 0, item: 0 });
  const [sideMenu, setSideMenu] = useState(false);
  const [activeSearchMenu, setActiveSearchMenu] = useState({group: 0, item: 0});
  const searchRef = useRef(null);
  const searchCloseRef = useRef(null);
  const searchBlurBgRef = useRef(null);
  const searchParentRef = useRef(null);
  const searchInputRef = useRef(null);
  const sideMenuRef = useRef(null);
  const sideMenuDivRef = useRef(null);
  const closeSideMenuRef = useRef(null);
  const sideMenuOpenerRef = useRef(null);

  useEffect(() => {
    if (searchShow && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchShow]);

  const handleBold = (groupIndex, itemIndex) => {
    setBold({ group: groupIndex, item: itemIndex });
  };

  const handleHover = (i,index) => {
    console.log(`Hovered over item ${index} in group ${i}`);
    setActiveSearchMenu({group: i, item: index});
  };

  useEffect(() => {
    const handleSelectedSearch = (e) => {
      const { group, item } = activeSearchMenu;
      const currentGroup = searchMenu[group];
      
      if (e.key === "ArrowDown") {
        if (item < currentGroup.content.length - 1) {
          // Move to the next item in the current group
          setActiveSearchMenu((prev) => ({
            ...prev,
            item: item + 1,
          }));
        } else if (group < searchMenu.length - 1) {
          // If we're at the last item in the group, move to the next group
          setActiveSearchMenu({
            group: group + 1,
            item: 0, // Reset item index for the next group
          });
        }
      }
    
      if (e.key === "ArrowUp") {
        if (item > 0) {
          // Move to the previous item in the current group
          setActiveSearchMenu((prev) => ({
            ...prev,
            item: item - 1,
          }));
        } else if (group > 0) {
          // If we're at the first item in the group, move to the previous group
          setActiveSearchMenu({
            group: group - 1,
            item: searchMenu[group - 1].content.length - 1, // Set item to the last item of the previous group
          });
        }
      }
    };
    

    const handleSearch = (e) => {
      if (searchRef.current.contains(e.target)) {
        setSearchShow((prev) => !prev);
      } else if (
        searchCloseRef.current.contains(e.target) ||
        (searchBlurBgRef.current.contains(e.target) &&
          !searchParentRef.current.contains(e.target))
      ) {
        setSearchShow((prev) => !prev);
      }
    };

    const handleSideMenu = (e) => {
      if (
        (sideMenuRef.current.contains(e.target) &&
          !sideMenuDivRef.current.contains(e.target)) ||
        closeSideMenuRef.current.contains(e.target)
      ) {
        setSideMenu((prev) => !prev);
      } else if (sideMenuOpenerRef.current.contains(e.target)) {
        setSideMenu((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleSelectedSearch);
    document.addEventListener("click", handleSearch);
    document.addEventListener("click", handleSideMenu);

    return () => {
      document.removeEventListener("keydown", handleSelectedSearch);
      document.removeEventListener("click", handleSearch);
      document.removeEventListener("click", handleSideMenu);
    };
  });

  return (
    <div className="pt-[60px] bg-white w-full  dark:bg-black">
      <div className="w-full lg:px-10 mx:w-[1444px] mx-auto lg:flex">
        <div className="w-[16rem] max-h-[100vh] overflow-auto lg:block hidden fixed ">
          <div className="fixed pt-8 bg-white">
            <button
              ref={searchRef}
              className="flex justify-between items-center ring-1 w-56 h-8 rounded-md text-sm ring-slate-900/10 hover:ring-slate-300 shadow-sm text-slate-400"
            >
              <img className="w-5 ml-2" src={search} alt="search" />
              <p className="flex-1 flex pl-3">Search...</p>
              <p className="mr-2 font-semibold">Ctrl K</p>
            </button>
          </div>
          <div className="mt-20">
            {menuComponents.map(({ title, content }, i) => (
              <div key={i} className="">
                <p className="font-semibold mb-2">{title}</p>
                {content.map(({ text, link }, index) => (
                  <li
                    key={index}
                    onClick={() => handleBold(i, index)}
                    className={`pl-2 hover:border-slate-400 text-slate-700 list-none hover:text-slate-900 hover:border-l-2 mb-1 ${
                      bold.group === i && bold.item === index
                        ? "border-l-2 border-blue-600 font-semibold"
                        : ""
                    }`}
                  >
                    <Link className="w-full block" to={link}>
                      {text}
                    </Link>
                  </li>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={sideMenuRef}
          className={`w-full lg:hidden fixed z-10 inset-0 max-h-[100vh] overflow-auto bg-black/20 backdrop-blur-sm ${
            sideMenu ? "block" : "hidden"
          }`}
        >
          <div
            ref={sideMenuDivRef}
            className="absolute bg-white w-80 max-w-[calc(100%-3rem)] h-[150vh] p-6 flex justify-between"
          >
            <div className="">
              {menuComponents.map(({ title, content }, i) => (
                <div key={i} className="">
                  <p className="font-semibold mb-2">{title}</p>
                  {content.map(({ text, link }, index) => (
                    <li
                      key={index}
                      onClick={() => handleBold(i, index)}
                      className={`pl-2 hover:border-slate-400 text-slate-700 list-none hover:text-slate-900 hover:border-l-2 mb-1 ${
                        bold.group === i && bold.item === index
                          ? "border-l-2 border-blue-600 font-semibold"
                          : ""
                      }`}
                    >
                      <Link className="w-full block" to={link}>
                        {text}
                      </Link>
                    </li>
                  ))}
                </div>
              ))}
            </div>
            <div className="">
              <img
                ref={closeSideMenuRef}
                src={close}
                alt="close"
                className="w-5"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:hidden border-b-2">
          <div className="flex items-center py-3">
            <img
              ref={sideMenuOpenerRef}
              className="w-6 mx-4"
              src={menuList}
              alt="list"
            />
            <p className="text-slate-400 mr-2">
              {menuComponents[bold.group].title}
            </p>
            <img className="-rotate-90 w-3 mr-2" src={dropdown} alt="arrow" />
            <p className="font-semibold">
              {menuComponents[bold.group].content[bold.item].text}
            </p>
          </div>
        </div>
        <div
          ref={searchBlurBgRef}
          className={`w-screen h-[100vh] fixed bg-black/20 backdrop-blur-sm top-0 inset-0 z-10 ${
            searchShow ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-center h-full md:mt-16 md:px-32 p-6">
            <div
              ref={searchParentRef}
              className="bg-white w-full lg:w-[750px] h-[500px] rounded-lg"
            >
              <header className="flex justify-between items-center pb-3 border-b-[1px] p-4">
                <img src={search} alt="search" className="w-5" />
                <input
                  type="text"
                  placeholder="Search something"
                  ref={searchInputRef}
                  className="mx-4 w-full text-[15px] flex-1 outline-none focus:border-0 focus:outline-none"
                />
                <img
                  src={close}
                  alt="close"
                  className="w-5 cursor-pointer"
                  ref={searchCloseRef}
                />
              </header>
              <div className="p-4 pl-5">
                  {searchMenu.map(({ title, content }, i) => (
                    <div key={i} className="">
                      <h2 className="text-base font-medium">{title}</h2>
                      {content.map((e, index)=>(
                      <div
                        key={index}
                        onMouseEnter={() => handleHover(i, index)}
                        className={`flex justify-between px-3 py-3 rounded-lg items-center cursor-pointer ${
                          index === activeSearchMenu.item && i === activeSearchMenu.group
                            ? "bg-[#0EA5E9]"
                            : "bg-[#F8FAFC]"
                        }`}
                      >
                        <img
                          src={index === activeSearchMenu.item && i === activeSearchMenu.group ? codeWhite : code}
                          alt="code"
                          className={`w-7 rounded-lg border-[1px] border-[#EAECEF] p-1 ${
                            index === activeSearchMenu.item && i === activeSearchMenu.group ? "bg-[#0EA5E9]" : "bg-white"
                          }`}
                        />
                        <p
                          className={`flex-1 px-3 text-[#334155] ${
                            index === activeSearchMenu.item && i === activeSearchMenu.group && "text-white"
                          }`}
                        >
                          {e}
                        </p>
                        <img
                          src={
                            index === activeSearchMenu.item && i === activeSearchMenu.group ? dropdownWhite : dropdown
                          }
                          alt="dropright"
                          className="-rotate-90 w-3 cursor-pointer"
                        />
                      </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:pl-[19.5rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
