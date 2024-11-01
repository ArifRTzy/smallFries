import { useEffect, useRef, useState } from "react";
import { themeOptions } from "../constants";
import { close, dark, github, light, menuDot, search } from "../utils";

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

  const { sun, moon, system } = themeText;
  const themesRef = useRef(null);
  const sunRef = useRef(null);
  const lightRef = useRef(null);
  const darkRef = useRef(null);
  const systemRef = useRef(null);

  useEffect(() => {
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

    document.addEventListener("click", handleOutsideThemes);

    return () => {
      document.removeEventListener("click", handleOutsideThemes);
    };
  }, [themesMenu]);

  useEffect(() => {
    const updatedThemes = (e) => {
      if (lightRef.current.contains(e.target)) {
        setTheme("light");
        setThemeText({ sun: true, moon: false, system: false });
      } else if (darkRef.current.contains(e.target)) {
        setTheme("dark");
        setThemeText({ sun: false, moon: true, system: false });
      } else if (systemRef.current.contains(e.target)) {
        setTheme(
          window.matchMedia("prefer-color-scheme: dark").matches
            ? "dark"
            : "light"
        );
        setThemeText({ sun: false, moon: false, system: true });
      }
    };

    document.addEventListener("click", updatedThemes);

    return () => document.removeEventListener("click", updatedThemes);
  }, [sun, moon, system]);

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("themeText", JSON.stringify(themeText));
  }, [theme, themeText]);

  return (
    <div className="bg-white w-full border-b-2 border-[#E7E7E9] fixed z-10 dark:bg-black">
      <div className="w-full px-5 lg:px-10 mx:w-[1444px] mx-auto flex justify-between py-3 items-center">
        <div className="">
          <p className="text-2xl font-semibold">smallFries</p>
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
              className={`flex-col border-2 border-solid w-36 rounded-lg absolute bg-white z-20 top-14 -left-20 shadow-lg ${
                themesMenu ? "flex" : "hidden"
              }`}
            >
              {themeOptions.map(({ img, text, imgBlue }, i) => (
                <div
                  className={`flex px-2.5 cursor-pointer py-1.5 items-center  ${
                    i === 0 ? "rounded-t-lg" : i == 2 ? "rounded-b-lg" : ""
                  }
                  ${
                    (i === 0 && themeText.sun) ||
                    (i === 1 && themeText.moon) ||
                    (i === 2 && themeText.system)
                      ? "bg-[#F8FAFC]"
                      : "bg-white hover:bg-[#F8FAFC]"
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
                    className={`ml-2 font-semibold text-sm ${
                      (i === 0 && themeText.sun) ||
                      (i === 1 && themeText.moon) ||
                      (i === 2 && themeText.system)
                        ? "text-sky-500"
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
          <img src={search} className="w-5" />
          <div className="">
            <img src={menuDot} className="w-6 ml-4" />
            <div className="">
              <p>Github</p>
              <div className="">
                <div className="">
                  <p>Switch theme</p>
                  <img src={close} className="w-5" />
                </div>
                <select name="" id="">
                  <option value="">light</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
