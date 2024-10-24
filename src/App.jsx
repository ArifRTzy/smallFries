import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="">
      <Navbar/>
      <Sidebar/>
    </div>
  )
}

export default App
