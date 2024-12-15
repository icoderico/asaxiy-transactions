import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div className="flex items-start">
        <Sidebar open={open} />
        <div className="w-full">
          <Navbar setOpen={setOpen} open={open} />
          <div className="p-3 pb-20">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
