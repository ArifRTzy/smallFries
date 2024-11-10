import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="pt-[60px] bg-white w-full  dark:bg-black">
      <div className="w-full px-5 lg:px-10 mx:w-[1444px] mx-auto flex">
        <div className="w-[20%] max-h-[100vh] overflow-auto lg:block hidden fixed ">
          <div className="">
            <input type="text" className="border-2" />
          </div>
          <div className="">
            <li className="">
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/comp">comp</Link>
            </li>
          </div>
        </div>
        <div className="w-full h-[100vh] lg:pl-[19.5rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
