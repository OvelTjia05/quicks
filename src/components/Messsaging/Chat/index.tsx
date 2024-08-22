import { ArrowLeftIcon, EllipsisIcon, XIcon } from "@/assets/icons";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";

const CHATGROUP = {
  id: "1",
  type: "group",
  groupName: "109220-Naturalization",
  messages: [
    {
      idMessage: "1",
      idUser: "1",
      name: "ovel",
      message:
        "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
      date: "01/06/2021 12:19",
      status: "read",
    },
    {
      idMessage: "2",
      idUser: "2",
      name: "Cammeron Phillips",
      message:
        "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
      date: "01/06/2021 12:21",
      status: "read",
    },
    {
      idMessage: "3",
      idUser: "2",
      name: "Cammeron Phillips",
      message:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi atque libero velit asperiores consequatur quas dolor esse sit non nemo, laudantium amet similique officia repellendus cum tempora omnis porro voluptatibus.",
      date: "01/06/2021 12:19",
      status: "read",
    },
    {
      idMessage: "4",
      idUser: "3",
      name: "Jane",
      message: "I understand",
      date: "01/06/2021 12:19",
      status: "read",
    },
    {
      idMessage: "5",
      idUser: "1",
      name: "ovel",
      message: "I understand",
      date: "01/06/2021 12:19",
      status: "read",
    },
    {
      idMessage: "6",
      idUser: "4",
      name: "John",
      message: "I understand",
      date: "08/21/2024 12:19",
      status: "read",
    },
    {
      idMessage: "7",
      idUser: "3",
      name: "Jane",
      message: "I understand",
      date: "08/20/2021 12:19",
      status: "read",
    },
    {
      idMessage: "8",
      idUser: "4",
      name: "John",
      message: "I understand",
      date: "08/21/2024 12:19",
      status: "unread",
    },
  ],
};

const CHATPERSON = {
  id: "2",
  type: "person",
  name: "Cammeron Phillips",
  messages: [
    {
      idMessage: "1",
      idUser: "1",
      name: "ovel",
      message:
        "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
      date: "01/06/2021 12:19",
      status: "read",
    },
    {
      idMessage: "2",
      idUser: "2",
      name: "Cammeron Phillips",
      message:
        "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
      date: "01/06/2021 12:21",
      status: "read",
    },
    {
      idMessage: "3",
      idUser: "2",
      name: "Cammeron Phillips",
      message:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi atque libero velit asperiores consequatur quas dolor esse sit non nemo, laudantium amet similique officia repellendus cum tempora omnis porro voluptatibus.",
      date: "01/06/2021 12:19",
      status: "read",
    },
    {
      idMessage: "4",
      idUser: "2",
      name: "Cammeron Phillips",
      message: "I understand",
      date: "01/06/2021 12:19",
      status: "read",
    },
    {
      idMessage: "5",
      idUser: "1",
      name: "ovel",
      message: "I understand",
      date: "01/06/2021 12:19",
      status: "read",
    },
    {
      idMessage: "6",
      idUser: "2",
      name: "Cammeron Phillips",
      message: "I understand",
      date: "08/21/2024 12:19",
      status: "read",
    },
    {
      idMessage: "7",
      idUser: "1",
      name: "Ovel",
      message: "I understand",
      date: "08/20/2021 12:19",
      status: "read",
    },
    {
      idMessage: "8",
      idUser: "2",
      name: "Cammeron Phillips",
      message: "I understand",
      date: "08/21/2024 12:19",
      status: "unread",
    },
  ],
};

const MY_ID = "1";

const Chat: React.FC<{ id: string; onClose: Function }> = ({ id, onClose }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [chatData, setChatData] = useState(
    id === CHATGROUP.id ? CHATGROUP : CHATPERSON,
  );
  const [editing, setEditing] = useState<{
    message: string;
    idMessage: string;
  } | null>(null);
  const [message, setMessage] = useState("");

  chatData.messages.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const scrollToBottom = () => {
    const chat = document.getElementById("chat-container");
    chat?.scrollTo({
      top: chat.scrollHeight,
      behavior: "auto",
    });
  };

  const autoExpandTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      console.log("yaho");
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (editing) {
      setMessage(editing.message);
    }
    if (inputRef.current) {
      inputRef.current.focus();
      autoExpandTextareaHeight();
    }
  }, [editing]);

  useEffect(() => {
    autoExpandTextareaHeight();
  }, [message]);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  const handleSend = () => {
    if (message.trim() !== "") {
      if (editing) {
        setChatData((prevData) => ({
          ...prevData,
          messages: prevData.messages.map((msg) => {
            if (msg.idMessage === editing.idMessage) {
              return {
                ...msg,
                message: message,
              };
            }
            return msg;
          }),
        }));
        setEditing(null);
      } else {
        const newMessage = {
          idMessage: (chatData.messages.length + 1).toString(),
          idUser: MY_ID,
          name: "ovel",
          message: message,
          date: new Date().toLocaleString(),
          status: "read",
        };

        setChatData((prevData) => ({
          ...prevData,
          messages: [...prevData.messages, newMessage],
        }));
      }
      setMessage("");
    }
  };

  const handleDelete = (id: string) => {
    setChatData((prevData) => ({
      ...prevData,
      messages: prevData.messages.filter((message) => message.idMessage !== id),
    }));
  };

  const assignColor = (id: string) => {
    const arr = [
      ...new Set([MY_ID, ...chatData.messages.map((item) => item.idUser)]),
    ];
    if (chatData.type === "person") {
      return id === MY_ID
        ? { color: "text-chats-lavender-200", bg: "bg-chats-lavender-100" }
        : { color: "text-primary-blue", bg: "bg-[#F8F8F8]" };
    }
    return id === MY_ID
      ? { color: "text-chats-lavender-200", bg: "bg-chats-lavender-100" }
      : arr.indexOf(id) % 2 === 0
        ? { color: "text-chats-mint-200", bg: "bg-chats-mint-100" }
        : { color: "text-chats-peach-200", bg: "bg-chats-peach-100" };
  };

  return (
    <>
      <div className="absolute left-0 right-0 top-0 flex h-[74px] items-center justify-between gap-[15px] border-b border-border-gray-200 bg-white px-8 py-4">
        <ArrowLeftIcon
          className="h-4 w-4 fill-background"
          onClick={() => onClose()}
        />
        <div className="flex flex-1 flex-col">
          <h5 className="line-clamp-1 text-ellipsis font-bold leading-5 text-primary-blue">
            {id === "1" ? CHATGROUP.groupName : CHATPERSON.name}
          </h5>
          {id === "1" && (
            <small>
              {
                [...new Set(CHATGROUP.messages.map((item) => item.idUser))]
                  .length
              }{" "}
              Participant
            </small>
          )}
        </div>
        <XIcon
          className="h-[14px] w-[14px] fill-background"
          onClick={() => onClose()}
        />
      </div>
      <div className="flex h-full">
        <div
          id="chat-container"
          className="custom-scrollbar relative mb-[60px] mt-14 flex flex-1 flex-col gap-2 overflow-y-auto pr-1 text-primary-gray-300"
        >
          {chatData.messages.map((item, index) => (
            <div key={item.idMessage}>
              <div
                className={`max-w-[80%] ${item.idUser === MY_ID ? "ml-auto" : ""}`}
              >
                <p
                  className={`mb-1 text-sm font-bold ${assignColor(item.idUser).color} ${item.idUser === MY_ID && "text-end"}`}
                >
                  {item.idUser === MY_ID ? "You" : item.name}
                </p>
                <div
                  className={`flex gap-x-2 ${
                    item.idUser === MY_ID ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`rounded-[5px] p-[10px] ${assignColor(item.idUser)?.bg}`}
                  >
                    <p className="text-sm">{item.message}</p>
                    <small>
                      {new Date(item.date).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </small>
                  </div>
                  <Popover>
                    <PopoverTrigger className="h-fit py-1">
                      <EllipsisIcon className="fill-primary-gray-300" />
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align={MY_ID !== item.idUser ? "start" : "end"}
                    >
                      <div className="flex min-w-[120px] flex-col [&>p]:w-full [&>p]:px-3 [&>p]:py-2">
                        {item.idUser === MY_ID && (
                          <p
                            className="border-b border-primary-gray-300 text-primary-blue"
                            onClick={() => setEditing(item)}
                          >
                            Edit
                          </p>
                        )}
                        <p onClick={() => handleDelete(item.idMessage)}>
                          Delete
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {index ===
                chatData.messages.findIndex(
                  (item) => item.status === "unread",
                ) -
                  1 && (
                <div className="mt-4 flex items-center justify-center gap-x-6">
                  <div className="flex flex-1 border border-indicator-red"></div>
                  <h6 className="font-bold text-indicator-red">New Message</h6>
                  <div className="flex flex-1 border border-indicator-red"></div>
                </div>
              )}
              {index ===
                chatData.messages.findIndex(
                  (item) =>
                    new Date(item.date).toDateString() ===
                    new Date().toDateString(),
                ) -
                  1 && (
                <div className="mt-4 flex items-center justify-center gap-x-6">
                  <div className="flex flex-1 border border-primary-gray-300"></div>
                  <h6 className="font-bold text-primary-gray-300">
                    Today{" "}
                    {new Date().toLocaleDateString(undefined, {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </h6>
                  <div className="flex flex-1 border border-primary-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        {chatData.messages.some((item) => item.status === "unread") && (
          <div className="absolute bottom-20 left-1/2 inline-flex -translate-x-1/2 transform">
            <Badge label={"New Message"} />
          </div>
        )}
      </div>
      <div className="sticky bottom-0 flex gap-3 bg-white">
        <textarea
          rows={1}
          maxLength={1000}
          ref={inputRef}
          value={message}
          placeholder="Type a new message"
          className="scrollbar-hidden flex max-h-24 flex-1 resize-none rounded-[5px] border border-primary-gray-200 px-3 py-2 text-background ring-primary-gray-200 focus:outline-none focus:ring-1"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </>
  );
};

export default Chat;
