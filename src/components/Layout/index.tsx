import { SearchIcon } from "@/assets/icons";
import Sidebar from "../Sidebar";
import Menu from "../ui/menu";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="relative w-full overflow-hidden">
        <div className="flex h-[58px] items-center bg-primary-gray-300 px-[26px]">
          <SearchIcon className="h-4 w-4" />
        </div>
        <div className="absolute bottom-[27px] right-[27px] flex flex-row-reverse items-center gap-[26px]">
          <Menu onClick={() => console.log("hello")} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
