import { Button } from "@material-tailwind/react";
import React from "react";

const MyButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className="bg-[#006bff] text-white border-none flex items-center gap-2 w-full"
    >
      {children}
    </Button>
  );
};

export default MyButton;
