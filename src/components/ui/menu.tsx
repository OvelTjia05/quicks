import { ChatIcon, LightningIcon, ToDoIcon } from "@/assets/icons";
import { useState } from "react";
import PopUp from "../PopUp";

const LIST = [
  {
    icon: ChatIcon,
    label: "Inbox",
    color: "indicator-purple",
  },
  {
    icon: ToDoIcon,
    label: "Task",
    color: "indicator-orange",
  },
];

const Menu: React.FC<{ onClick: Function }> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // const sortedList = (() => {
  //   if (active === null) return LIST;

  //   const activeIndex = LIST.findIndex((item) => item.label === active);

  //   if (activeIndex > 0) {
  //     const updatedList = [
  //       LIST[activeIndex],
  //       ...LIST.slice(1, activeIndex),
  //       LIST[0],
  //       ...LIST.slice(activeIndex + 1),
  //     ];
  //     return updatedList;
  //   }

  //   return LIST;
  // })();

  // useEffect(() => {
  //   if (active !== null) {
  //     if (active === "Chat") {
  //       return <Messaging />;
  //     }
  //   }
  // }, [active]);

  const colorConvert = (base: string, color: string) => {
    switch (base) {
      case "bg":
        switch (color) {
          case "indicator-purple":
            return "bg-indicator-purple";
          case "indicator-orange":
            return "bg-indicator-orange";
          default:
            return "bg-foreground";
        }
      case "fill":
        switch (color) {
          case "indicator-purple":
            return "fill-indicator-purple";
          case "indicator-orange":
            return "fill-indicator-orange";
          default:
            return "fill-foreground";
        }
      default:
        return "";
    }
  };

  const handleMenu = (value: string) => {
    setActive(active === value ? null : value);
    onClick();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-[68px] w-[68px] items-center justify-center rounded-full bg-primary-blue ${
          active === null ? "animate-appear" : "animate-disappear"
        }`}
      >
        <LightningIcon />
      </button>

      {/* <div className="menu-container flex items-center gap-[26px]"> */}
      {LIST.map((item, index) => (
        <div
          key={index}
          className={`menu-item relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full transition-all ${isOpen === true ? "" : "pointer-events-none -z-10"} ${active === item.label && `active`} `}
          style={{
            transform: isOpen
              ? `${active !== null ? `translateX(94px)` : "translateX(0px)"}`
              : `translateX(${(index + 1) * 89}px)`,
            // transition: !isOpen ? `opacity linear 0.3s` : "",
            // opacity: isOpen ? "1" : "0",
          }}
          onClick={() => handleMenu(item.label)}
        >
          {!active && isOpen && (
            <small className="absolute -top-5">{item.label}</small>
          )}
          <div
            className={`absolute left-0 top-0 -z-10 h-full w-full rounded-full ${
              active === item.label
                ? `${colorConvert("bg", item.color)}`
                : "bg-foreground"
            }`}
          ></div>
          <item.icon
            className={` ${
              active === item.label
                ? "fill-foreground"
                : colorConvert("fill", item.color)
            }`}
          />
        </div>
      ))}
      {/* </div> */}

      {active && <PopUp type={active} />}
    </>
  );
};

export default Menu;
