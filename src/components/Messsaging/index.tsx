import { PersonIcon, SearchIcon } from "@/assets/icons";
import Chat from "./Chat";
import { useState } from "react";

type ChatItem = {
  id: string;
  type: "group" | "person";
  groupName?: string;
  name?: string;
  latestMessage: {
    date: string;
    name?: string;
    message: string;
    status: "read" | "unread";
  };
};

const CHATLIST: ChatItem[] = [
  {
    id: "1",
    type: "group",
    groupName: "109220-Naturalization",
    latestMessage: {
      date: "01/01/2021 19:10",
      name: "Cammeron Phillips",
      message: "Please check this out!",
      status: "unread",
    },
  },
  {
    id: "2",
    type: "group",
    groupName:
      "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
    latestMessage: {
      date: "02/06/2021 10:45",
      name: "Ellen",
      message: "Hey, please read.",
      status: "read",
    },
  },
  {
    id: "3",
    type: "group",
    groupName: "109220-Naturalization",
    latestMessage: {
      date: "01/06/2021 12:19",
      name: "Cammeron Phillips",
      message:
        "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
      status: "read",
    },
  },
  {
    id: "4",
    type: "person",
    name: "FastVisa Support",
    latestMessage: {
      date: "01/06/2021 10:45",
      message: "Hey there! Welcome to your inbox.",
      status: "read",
    },
  },
];
const Messaging = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <>
      {!selectedChat ? (
        <>
          <div className="flex items-center gap-2 rounded-[5px] border border-primary-gray-200 px-[10%] py-1">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none"
            />
            <SearchIcon className="h-3 w-3 fill-background" />
          </div>
          {CHATLIST.map((item, index) => (
            <div
              key={index}
              className={`relative flex gap-4 py-[22px] text-primary-gray-300 ${
                index !== CHATLIST.length - 1 &&
                "border-b border-b-primary-gray-200"
              }`}
              onClick={() => setSelectedChat(item.id)}
            >
              {item.latestMessage.status === "unread" && (
                <div className="absolute right-0 h-[10px] w-[10px] self-center rounded-full bg-indicator-red"></div>
              )}
              {item.type === "group" ? (
                <div className="relative inline-flex h-fit shrink items-center justify-center">
                  <div className="left-1/4 inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-primary-gray-100 p-2">
                    <PersonIcon className="h-full w-full fill-primary-gray-300" />
                  </div>
                  <div className="right-1/4 -ml-[17px] inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-full bg-primary-blue p-2">
                    <PersonIcon className="h-full w-full" />
                  </div>
                </div>
              ) : (
                <div className="flex w-[51px] justify-center">
                  <div className="relative inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-full bg-primary-blue p-2 text-white">
                    {item.name?.slice(0, 1).toUpperCase()}
                  </div>
                </div>
              )}
              <div className="flex flex-col">
                <div className="mb-1 flex gap-x-4 leading-none">
                  <p className="font-bold text-primary-blue">
                    {item.type === "group" ? item.groupName : item.name}
                  </p>
                  <p className="min-w-fit">{item.latestMessage.date}</p>
                </div>
                <p className="text-sm font-bold">
                  {item.type === "group" && item.latestMessage.name}
                </p>
                <p className="text-sm">
                  {item.type === "group"
                    ? item.latestMessage.message
                    : item.latestMessage.message}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Chat
          id={
            CHATLIST.some(
              (item) => item.id === selectedChat && item.type === "group",
            )
              ? "1"
              : "2"
          }
          onClose={() => setSelectedChat(null)}
        />
      )}
    </>
  );
};

export default Messaging;
