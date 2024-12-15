import { Avatar, Badge, Button, Input } from "@material-tailwind/react";
import React from "react";
import { BellDot, Menu } from "lucide-react";
import { asaxiy_logo } from "../../assets";

const Navbar = ({ setOpen, open }) => {
  return (
    <nav className=" w-full p-5 flex bg-white items-center shadow-sm justify-between sticky top-0">
      <div className="w-5/12 flex items-center gap-5">
        <Button
          onClick={() => setOpen(!open)}
          variant="outlined"
          className="lg:block hidden border-none outline-none bg-[#FAFAFA] py-2 px-4"
        >
          <Menu />
        </Button>
        <img src={asaxiy_logo} alt="" className="lg:hidden block" />
      </div>
      <div className="flex items-center gap-4">
        <Badge color="red">
          <Button
            variant="outlined"
            className="w-14 h-14 flex bg-[#FAFAFA] border-none items-center p-0 rounded-full shadow-md justify-center"
          >
            <BellDot />
          </Button>
        </Badge>

        <Avatar
          className="shadow-md w-14 h-14"
          src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/people19.png"
        ></Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
