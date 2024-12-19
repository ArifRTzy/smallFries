import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { menuComponents, themeOptions } from "../constants";
import {
  close,
  code,
  dark,
  dropdown,
  github,
  light,
  menuDot,
  search,
  dropdownWhite,
  codeWhite,
} from "../utils";

const Navbar = () => {
  const [themesMenu, setThemeMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    return window.matchMedia("(prefer-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [themeText, setThemeText] = useState(() => {
    const savedCon = localStorage.getItem("themeText");
    if (savedCon) return JSON.parse(savedCon);

    const savedTheme = localStorage.getItem("theme");
    if (
      !savedTheme &&
      !window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return { sun: true, moon: false, system: false };
    } else if (
      !savedTheme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return { sun: false, moon: true, system: false };
    }
    return { sun: false, moon: false, system: true };
  });
  const [selectedRefShow, setSelectedRefShow] = useState(() => {
    const savedSelect = localStorage.getItem("selectedRef");
    return savedSelect === false || savedSelect === undefined ? 0 : savedSelect;
  });
  const [menuShow, setMenuShow] = useState(false);
  const [activeSearchMenu, setActiveSearchMenu] = useState({group: 0, item: 0});
  const [searchShow, setSearchShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(menuComponents);
  const { sun, moon, system } = themeText;
  const themesRef = useRef(null);
  const sunRef = useRef(null);
  const lightRef = useRef(null);
  const darkRef = useRef(null);
  const systemRef = useRef(null);
  const selectRef = useRef(null);
  const selectedRef = useRef(null);
  const menuRef = useRef(null);
  const closeRef = useRef(null);
  const blurBgRef = useRef(null);
  const searchRef = useRef(null);
  const searchCloseRef = useRef(null);
  const searchBlurBgRef = useRef(null);
  const searchParentRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleHover = (i,index) => {
    setActiveSearchMenu({group: i, item: index});
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

  const handleSearchVisibility = ()=>{
    setSearchShow(false)
  }

  useEffect(() => {
    if (searchShow && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchShow]);

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

    const handleOutsideThemes = (e) => {
      if (
        themesRef.current.contains(e.target) ||
        sunRef.current.contains(e.target)
      ) {
        setThemeMenu((prev) => !prev);
      } else if (themesMenu) {
        if (
          !themesRef.current.contains(e.target) ||
          !sunRef.current.contains(e.target)
        ) {
          setThemeMenu((prev) => !prev);
        }
      }
    };

    const handleMenuShow = (e) => {
      if (menuRef.current.contains(e.target)) {
        setMenuShow((prev) => !prev);
      } else if (
        closeRef.current.contains(e.target) ||
        blurBgRef.current.contains(e.target)
      ) {
        setMenuShow((prev) => !prev);
      }
    };

    const handleMenuVisibility = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setMenuShow(false);
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

    document.addEventListener("click", handleOutsideThemes);
    document.addEventListener("click", handleMenuShow);
    window.addEventListener("resize", handleMenuVisibility);
    document.addEventListener("keydown", handleSelectedSearch);
    document.addEventListener("click", handleSearch);

    return () => {
      document.removeEventListener("click", handleOutsideThemes);
      document.removeEventListener("click", handleMenuShow);
      window.removeEventListener("resize", handleMenuVisibility);
      document.removeEventListener("keydown", handleSelectedSearch);
      document.removeEventListener("click", handleSearch);
    };
  }, [themesMenu, activeSearchMenu, filteredMenu]);

  useEffect(() => {
    const updatedThemes = (e) => {
      if (lightRef.current.contains(e.target)) {
        setTheme("light");
        setThemeText({ sun: true, moon: false, system: false });
        setSelectedRefShow(0);
        selectRef.current.selectedIndex[0];
      } else if (darkRef.current.contains(e.target)) {
        setTheme("dark");
        setThemeText({ sun: false, moon: true, system: false });
        setSelectedRefShow(1);
        selectRef.current.selectedIndex[1];
      } else if (systemRef.current.contains(e.target)) {
        setTheme(
          window.matchMedia("prefer-color-scheme: dark").matches
            ? "dark"
            : "light"
        );
        setThemeText({ sun: false, moon: false, system: true });
        setSelectedRefShow(2);
        selectRef.current.selectedIndex[2];
      }
    };

    document.addEventListener("click", updatedThemes);

    return () => document.removeEventListener("click", updatedThemes);
  }, [sun, moon, system, selectedRefShow]);

  useEffect(() => {
    if (selectedRefShow === 0) {
      setTheme("light");
      setThemeText({ sun: true, moon: false, system: false });
    } else if (selectedRefShow === 1) {
      setTheme("dark");
      setThemeText({ sun: false, moon: true, system: false });
    } else if (selectedRefShow === 2) {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
      setThemeText({ sun: false, moon: false, system: true });
    }
  }, [selectedRefShow]);

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    localStorage.setItem("themeText", JSON.stringify(themeText));
    localStorage.setItem("selectedRef", selectedRefShow);
  }, [theme, themeText, selectedRefShow]);

  useEffect(() => {
    selectRef.current.addEventListener("change", () => {
      setSelectedRefShow(selectRef.current.selectedIndex);
    });
    const savedSelect = localStorage.getItem("selectedRef");
    selectRef.current.selectedIndex = savedSelect;
  });

  return (
    <div className="bg-white w-full border-b-[1px] lg:border-b lg:border-neutral-200 dark:border-white/[0.1] fixed z-10 dark:bg-black">
      <div className="w-full px-5 lg:px-10 mx:w-[1444px] mx-auto flex justify-between py-3 items-center">
        <div className="">
          <p className="text-2xl font-semibold dark:text-white">smallFriez</p>
        </div>
        <div className="hidden gap-x-4 lg:flex">
          <div className="relative">
            <img
              src={theme === "light" ? light : dark}
              ref={sunRef}
              className="w-5 h-5 cursor-pointer"
            />
            <div
              ref={themesRef}
              className={`flex-col border-2 border-solid w-36 dark:border-[#2A3749] rounded-lg absolute dark:bg-slate-800 bg-white z-20 top-14 -left-20 shadow-lg ${
                themesMenu ? "flex" : "hidden"
              }`}
            >
              {themeOptions.map(({ img, text, imgBlue }, i) => (
                <div
                  className={`flex px-2.5 cursor-pointer py-1.5 items-center hover:bg-[#F8FAFC] dark:hover:bg-[#2A3749] ${
                    i === 0 ? "rounded-t-lg" : i == 2 ? "rounded-b-lg" : ""
                  }
                  `}
                  key={i}
                  ref={i == 0 ? lightRef : i == 1 ? darkRef : systemRef}
                >
                  <img
                    src={
                      (i === 0 && themeText.sun) ||
                      (i === 1 && themeText.moon) ||
                      (i === 2 && themeText.system)
                        ? imgBlue
                        : img
                    }
                    alt={text}
                    className="w-6"
                  />
                  <p
                    className={`ml-2 font-semibold text-sm dark:text-slate-300 ${
                      (i === 0 && themeText.sun) ||
                      (i === 1 && themeText.moon) ||
                      (i === 2 && themeText.system)
                        ? "text-sky-500 dark:text-sky-500"
                        : "text-[#334155]"
                    }`}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <a href="https://github.com/ArifRTzy" className="">
            <img src={github} className="w-5 h-5" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <img src={search} ref={searchRef} className="w-5" />
          <img src={menuDot} ref={menuRef} className="w-6 ml-4" />
          <div
            className={`absolute top-0 right-0 ${
              menuShow ? "block" : "hidden"
            }`}
          >
            <div
              ref={blurBgRef}
              className="w-screen inset-0 h-[100vh] bg-black/20 backdrop-blur-sm fixed"
            ></div>
            <div className="bg-white dark:bg-slate-800 w-full vm:w-80 h-[22rem] border-2 rounded-lg fixed z-20 top-4 right-4 dark:border-[#2A3749]">
              <div className="mx-5 py-5 flex flex-col justify-between h-full">
                <div className="flex justify-between">
                  <a
                    className="font-medium text-base dark:text-[#94A3B8]"
                    href="https://github.com/ArifRTzy"
                  >
                    GitHub
                  </a>
                  <img src={close} ref={closeRef} className="w-5" />
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-normal text-slate-700 dark:text-slate-400">Switch theme</p>
                  <div className="relative">
                    <select
                      className={`${
                        selectedRefShow < 2 ? "w-[115px]" : "w-[137px]"
                      } h-11 opacity-0 absolute dark:bg-black dark:text-white`}
                      ref={selectRef}
                    >
                      <option value="0">Light</option>
                      <option value="1">Dark</option>
                      <option value="2">System</option>
                    </select>
                    <div
                      className="border-2 flex items-center h-11 px-2 rounded-lg bg-white dark:bg-[#475569] dark:border-[#2A3749]"
                      ref={selectedRef}
                    >
                      {themeOptions.map((e, i) => (
                        <div
                          className={`items-center w-full justify-between ${
                            i != selectedRefShow ? "hidden" : "flex"
                          }`}
                          key={i}
                        >
                          <img className="w-5 mr-3" src={e.img} alt={e.text} />
                          <p className="font-semibold text-slate-700 dark:text-white">
                            {e.text}
                          </p>
                          <img
                            className="w-3 ml-3"
                            src={dropdown}
                            alt="dropdown"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={searchBlurBgRef}
        className={`w-screen h-[100vh] fixed bg-black/20 backdrop-blur-sm inset-0 ${
          searchShow ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-center h-full md:mt-16 md:px-32 p-6">
          <div
            ref={searchParentRef}
            className="bg-white w-full lg:w-[750px] h-[500px] rounded-lg dark:bg-[#1E293B]"
          >
            <header className="flex justify-between items-center pb-3 border-b-[1px] p-4 dark:border-b-slate-700">
              <img src={search} alt="search" className="w-5" />
              <input
                type="search"
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
                  <p className="text-gray-500 mt-4 flex justify-center">No results found.</p>
                ) : (
                  <div className="">
                    {filteredMenu.map(({ title, content }, i) => (
                      <div key={i} className="">
                        <h2 className="text-base font-medium dark:text-white">{title}</h2>
                        {content.map(({text, link}, index) => (
                          <Link
                            key={index}
                            to={link}
                            onMouseEnter={() => handleHover(i, index)}
                            onClick={handleSearchVisibility}
                            className={`flex justify-between px-3 py-3 mb-2 rounded-lg items-center cursor-pointer ${
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
    </div>
  );
};

export default Navbar;
