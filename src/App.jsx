import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Comp from "./components/Comp";

const App = () => {
  return (
    <Router>
<<<<<<< HEAD
      <div className="h-[200vh]">
        <Navbar />
=======

<div className="">
      <Navbar/>
     
      <div className="flex-grow">
          <Routes>
            {/* Sidebar layout */}
            <Route path="/" element={<Sidebar />}>
              {/* Sidebar child routes */}
              <Route index element={<Home />} />
              <Route path="comp" element={<Comp />} />
            </Route>
          </Routes>
        </div>

    </div>


  </Router>

  )
}
>>>>>>> origin/main

        <div className="flex-grow">
          <Routes>
            {/* Sidebar layout */}
            <Route path="/" element={<Sidebar />}>
              {/* Sidebar child routes */}
              <Route index element={<Home />} />
              <Route path="comp" element={<Comp />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;