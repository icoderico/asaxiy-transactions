import { Link } from "react-router-dom";
import { content } from "./sidebarcontent";
import { asaxiy_logo } from "../../assets";
import MyButton from "../CustomButton";

const Sidebar = ({ open }) => {
  return (
    <>
      <div
        className={`bg-[#FAFAFA] lg:block hidden transition-all h-screen w-[420px] sticky top-0  ${
          !open ? "-ml-[420px]" : null
        } `}
      >
        <div className="p-5">
          <Link to={"/"}>
            <img src={asaxiy_logo} alt="" />
          </Link>
        </div>

        <ul className="flex flex-col gap-3 p-5 pt-10">
          {content?.map((cont, index) => (
            <li className=" " key={index}>
              <Link
                className=" w-full hover:text-blue-gray-500  font-medium inline-block "
                to={cont?.href}
              >
                <MyButton>
                  {cont?.icon}
                  {cont?.title}
                </MyButton>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{ borderRadius: "20px 20px 0 0" }}
        className=" lg:hidden  bottom-0 bg-blue-800  h-16 fixed w-full justify-around px-3 items-center flex "
      >
        {content?.map((con) => (
          <Link to={con?.href} className="bg-white p-3 rounded-full">
            <div className="text-blue-600">{con.icon}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
