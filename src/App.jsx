import React from "react";
import Auth from "./Screen/Auth/Auth";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Screen/Home/Home";

const App = () => {
  return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={<Home />} />
      </Routes>
  );
};

export default App;
