import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const navItems = [
  { route: "/", data: "Home" },
  { route: "/about", data: "About" },
];

const Navbar = () => {
  return (
    <div className="h-[60px] mt-2">
      <div className="flex items-center justify-between h-full px-4">
        <Link href="/" className="text-lg font-semibold">
          Traffic Annotator
        </Link>
        <div className="flex items-center space-x-4 font-medium">
          {navItems.map((item) => (
            <Link href={item.route} key={item.route}>
              {item.data}
            </Link>
          ))}
          <a href="https://github.com/sd1p/IISCB_Assignment" rel="noopener noreferrer">
            <FaGithub size={"20px"} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
