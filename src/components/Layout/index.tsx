import { SearchIcon } from "@/assets/icons";
import Sidebar from "../Sidebar";
import Menu from "../ui/menu";
import { useEffect, useState } from "react";
import Cover from "../Cover";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 3000);
  }, []);

  return (
    <div className="flex h-screen">
      {isOpen ? (
        <>
          <Sidebar />
          <div className="relative w-full overflow-hidden">
            <div className="flex h-[58px] items-center bg-primary-gray-300 px-[26px]">
              <SearchIcon className="h-4 w-4" />
            </div>
            <div className="absolute bottom-[27px] right-[27px] flex flex-row-reverse items-center gap-[26px]">
              <Menu />
            </div>
          </div>
        </>
      ) : (
        <Cover />
      )}
    </div>
  );
};

export default Layout;
