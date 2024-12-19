import { Link, Outlet, useLocation } from "react-router-dom";
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
import { menuComponents } from "../constants";

const Sidebar = () => {
  const [searchShow, setSearchShow] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [activeSearchMenu, setActiveSearchMenu] = useState({
    group: 0,
    item: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(menuComponents);
  const searchRef = useRef(null);
  const searchCloseRef = useRef(null);
  const searchBlurBgRef = useRef(null);
  const searchParentRef = useRef(null);
  const searchInputRef = useRef(null);
  const sideMenuRef = useRef(null);
  const sideMenuDivRef = useRef(null);
  const closeSideMenuRef = useRef(null);
  const sideMenuOpenerRef = useRef(null);
  const location = useLocation()
  const allItems = menuComponents.flatMap((menu) => menu.content).filter(({link}) => link === location.pathname);
  const activeComponentTitle = menuComponents.find(
    (menu) => menu.content.some((item) => item.link === location.pathname)
  )?.title

  useEffect(() => {
    if (searchShow && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchShow]);

  const handleHover = (i, index) => {
    setActiveSearchMenu({ group: i, item: index });
  };

  const handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase(); // Normalize input
    setSearchQuery(query);
    setActiveSearchMenu({ group: 0, item: 0 });

    // Split the query into words
    const queryWords = query.split(/\s+/).filter(Boolean); // Split by spaces and remove empty strings

    const filtered = menuComponents
      .map((group) => ({
        ...group,
        content: group.content.filter((item) => {
          // Split the item's content into words
          const itemWords = item.text.toLowerCase().split(/\s+/);

          // Check if every query word matches any word in the item's content partially
          return queryWords.every(
            (queryWord) =>
              itemWords.some((itemWord) => itemWord.includes(queryWord)) // Check for partial match
          );
        }),
      }))
      .filter((group) => group.content.length > 0); // Remove empty groups

    setFilteredMenu(filtered);
  };

  const handleSearchVisibility = () => {
    setSearchShow(false);
  };

  const handleSideMenu = ()=>{
    setSideMenu(false)
  }

  useEffect(() => {
    const handleSelectedSearch = (e) => {
      const { group, item } = activeSearchMenu;
      const currentGroup = filteredMenu[group];

      if (!currentGroup) return; // Handle edge cases with no results

      if (e.key === "ArrowDown") {
        if (item < currentGroup.content.length - 1) {
          setActiveSearchMenu((prev) => ({
            ...prev,
            item: item + 1,
          }));
        } else if (group < filteredMenu.length - 1) {
          setActiveSearchMenu({
            group: group + 1,
            item: 0,
          });
        } else {
          setActiveSearchMenu({
            group: 0,
            item: 0,
          });
        }
      }

      if (e.key === "ArrowUp") {
        if (item > 0) {
          setActiveSearchMenu((prev) => ({
            ...prev,
            item: item - 1,
          }));
        } else if (group > 0) {
          setActiveSearchMenu({
            group: group - 1,
            item: filteredMenu[group - 1].content.length - 1,
          });
        } else {
          setActiveSearchMenu({
            group: filteredMenu.length - 1,
            item: filteredMenu[filteredMenu.length - 1].content.length - 1,
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

    const handleSearchShortCut = (e)=>{
      if((e.ctrlKey || e.metaKey) && e.key === 'k'){
        e.preventDefault()
        setSearchShow((prev)=>!prev)
      }
    }

    document.addEventListener("keydown", handleSelectedSearch);
    document.addEventListener("keydown", handleSearchShortCut);
    document.addEventListener("click", handleSearch);
    document.addEventListener("click", handleSideMenu);

    return () => {
      document.removeEventListener("keydown", handleSelectedSearch);
      document.removeEventListener("keydown", handleSearchShortCut);
      document.removeEventListener("click", handleSearch);
      document.removeEventListener("click", handleSideMenu);
    };
  });

  return (
    <div className="pt-[60px] bg-white w-full min-h-[100vh]  dark:bg-black">
      <div className="w-full lg:px-10 mx:w-[1444px] mx-auto lg:flex">
        <div className="w-[16rem] max-h-[100vh] overflow-auto lg:block hidden fixed ">
          <div className="fixed pt-8 bg-transparent">
            <button
              ref={searchRef}
              className="flex justify-between items-center ring-1 w-56 h-8 rounded-md text-sm ring-slate-900/10 hover:ring-slate-300 shadow-sm text-slate-400 dark:ring-transparent dark:hover:bg-[#334155] dark:bg-[#1E293B]"
            >
              <img className="w-5 ml-2" src={search} alt="search" />
              <p className="flex-1 flex pl-3">Search...</p>
              <p className="mr-2 font-semibold">Ctrl K</p>
            </button>
          </div>
          <div className="mt-20">
            {menuComponents.map(({ title, content }, i) => (
              <div key={i} className="">
                <p className="font-semibold mb-2 dark:text-white">{title}</p>
                {content.map(({ text, link }, index) => (
                  <li
                    key={index}
                    className={`pl-2 hover:border-slate-400 text-slate-700 dark:text-slate-500 dark:hover:text-slate-400 list-none hover:text-slate-900 hover:border-l-2 mb-1 ${
                      location.pathname == link
                        ? "border-l-2 border-blue-600 font-semibold dark:text-slate-100"
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
            className="absolute bg-white w-80 max-w-[calc(100%-3rem)] h-[150vh] p-6 flex justify-between dark:bg-slate-900"
          >
            <div className="">
              {menuComponents.map(({ title, content }, i) => (
                <div key={i} className="">
                  <p className="font-semibold mb-2 dark:text-white">{title}</p>
                  {content.map(({ text, link }, index) => (
                    <li
                      key={index}
                      onClick={handleSideMenu}
                      className={`pl-2 hover:border-slate-400 text-slate-700 list-none hover:text-slate-900 hover:border-l-2 mb-1 dark:text-slate-500 dark:hover:text-slate-400 ${
                        location.pathname == link
                          ? "border-l-2 border-blue-600 font-semibold dark:text-slate-100"
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

        <div className="w-full lg:hidden border-b-2 dark:border-slate-500">
          <div className="flex items-center py-3">
            <img
              ref={sideMenuOpenerRef}
              className="w-6 mx-4"
              src={menuList}
              alt="list"
            />
            <p className="text-slate-400 mr-2">
              {activeComponentTitle}
            </p>
            <img className="-rotate-90 w-3 mr-2" src={dropdown} alt="arrow" />
            <p className="font-semibold dark:text-slate-400">
              {allItems[0].text}
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
              className="bg-white w-full lg:w-[750px] h-[500px] rounded-lg dark:bg-[#1E293B]"
            >
              <header className="flex justify-between items-center pb-3 border-b-[1px] p-4">
                <img src={search} alt="search" className="w-5" />
                <input
                  type="text"
                  placeholder="Search something"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={handleSearchInput}
                  className="mx-4 w-full text-[15px] flex-1 outline-none focus:border-0 focus:outline-none bg-transparent dark:text-white"
                />
                <img
                  src={close}
                  alt="close"
                  className="w-5 cursor-pointer"
                  ref={searchCloseRef}
                />
              </header>
              <div className="p-4 pl-5">
                {filteredMenu.length === 0 ? (
                  // Display this when no results are found
                  <p className="text-gray-500 mt-4 flex justify-center">
                    No results found.
                  </p>
                ) : (
                  <div className="">
                    {filteredMenu.map(({ title, content }, i) => (
                      <div key={i} className="">
                        <h2 className="text-base font-medium dark:text-white">{title}</h2>
                        {content.map(({ text, link }, index) => (
                          <Link
                            key={index}
                            to={link}
                            onMouseEnter={() => handleHover(i, index)}
                            onClick={handleSearchVisibility}
                            className={`flex justify-between px-3 py-3 rounded-lg items-center cursor-pointer ${
                              index === activeSearchMenu.item &&
                              i === activeSearchMenu.group
                                ? "bg-[#0EA5E9]"
                                : "bg-[#F8FAFC] dark:bg-[#243143]"
                            }`}
                          >
                            <img
                              src={
                                index === activeSearchMenu.item &&
                                i === activeSearchMenu.group
                                  ? codeWhite
                                  : code
                              }
                              alt="code"
                              className={`w-7 rounded-lg border-[1px] border-[#EAECEF] p-1 ${
                                index === activeSearchMenu.item &&
                                i === activeSearchMenu.group
                                  ? "bg-[#0EA5E9]"
                                  : "bg-white dark:bg-[#334155] dark:border-[#334155]"
                              }`}
                            />
                            <p
                              className={`flex-1 px-3 text-[#334155] dark:text-white ${
                                index === activeSearchMenu.item &&
                                i === activeSearchMenu.group &&
                                "text-white"
                              }`}
                            >
                              {text}
                            </p>
                            <img
                              src={
                                index === activeSearchMenu.item &&
                                i === activeSearchMenu.group
                                  ? dropdownWhite
                                  : dropdown
                              }
                              alt="dropright"
                              className="-rotate-90 w-3 cursor-pointer"
                            />
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
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
