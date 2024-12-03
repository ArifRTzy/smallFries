import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import WhatIsThis from "./components/contents/getStarted/WhatIsThis";
import Installation from "./components/contents/getStarted/Installation";
import NavbarFloat from "./components/contents/navbar/NavbarFloat";

const App = () => {
  return (
    <Router>
      <div className="w-full">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            {/* Sidebar layout */}
            <Route path="/" element={<Sidebar />}>
              {/* Sidebar child routes */}
              <Route index element={<WhatIsThis />} />
              <Route path="installation" element={<Installation />} />
              <Route path="navbar-float" element={<NavbarFloat />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
