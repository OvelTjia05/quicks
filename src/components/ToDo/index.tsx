import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ClockIcon, EllipsisIcon, PencilIcon } from "@/assets/icons";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useRef, useState } from "react";
import Loader from "../ui/loader";
import axios from "axios";

// const toDoList = [
//   {
//     id: "1",
//     title: "Close off Case #012920- RODRIGUES, Amiguel",
//     dueDate: "2024-08-24",
//     description:
//       "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
//     status: "finished",
//   },
//   {
//     id: "2",
//     title: "Close off Case #012920- RODRIGUES, Amiguel",
//     dueDate: "2024-08-23",
//     description:
//       "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
//     status: "unfinished",
//   },
//   {
//     id: "3",
//     title:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni voluptatum dolores atque vero quas doloremque placeat aliquid reprehenderit in? Facere.",
//     dueDate: "2024-08-25",
//     description:
//       "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
//     status: "finished",
//   },
// ];

type ToDo = {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  completed: boolean;
};

const MY_ID = "1";
const ToDo = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [task, setTask] = useState<ToDo[]>([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${MY_ID}`,
      );
      console.log("res", res);
      const { data, status } = res;
      if (status === 200) {
        const modifiedData = data.map((item: ToDo, index: number) => ({
          id: item.id.toString(),
          title: item.title,
          dueDate: new Date(Date.now() + 86400000 * (index + 1))
            .toISOString()
            .split("T")[0],
          description:
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni voluptatum dolores atque vero quas doloremque placeat aliquid reprehenderit in? Facere.",
          completed: false,
        }));
        setTask(modifiedData);
      }
      setIsLoading(false);
    } catch (error) {
      /* make an alert */
      console.log("error", error);
      alert("Error fetching data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [editing]);

  useEffect(() => {
    if (!editing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [task]);

  task.sort((a, b) => {
    if (a.title === "" && b.title !== "") return 1;
    else if (a.title !== "" && b.title === "") return -1;
    else if (!a.completed && b.completed) return -1;
    else if (a.completed && !b.completed) return 1;
    else if (a.completed && b.completed)
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const countDaysLeft = (date: string) => {
    return Math.ceil(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24),
    );
  };

  const handleAdd = () => {
    const newTask = {
      id: Math.random().toString(),
      title: "",
      dueDate: "",
      description: "",
      completed: false,
    };
    setTask((prevList) => [...prevList, newTask]);
    setTaskId(newTask.id);
  };

  const handleDelete = (id: string) => {
    setTask((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleTitleChange = (id: string) => {
    setTask((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, title: title } : item,
      ),
    );
    setTitle("");
  };

  const handleDateChange = (id: string, e: string) => {
    setTask((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, dueDate: e } : item)),
    );
  };

  const handleDescriptionChange = (id: string) => {
    setTask((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, description: desc } : item,
      ),
    );
    setEditing(null);
  };

  const handleStatusToggle = (id: string) => {
    setTask((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: item.completed ? false : true,
            }
          : item,
      ),
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader label="Loading Task List..." />
      ) : (
        <>
          <div className="sticky left-0 right-0 top-0 flex justify-between">
            <Select>
              <SelectTrigger className="ml-[10%]">
                <SelectValue placeholder="My Tasks" />
              </SelectTrigger>
              <SelectContent
                className="-translate-x-1/4 [&_*]:cursor-pointer"
                sideOffset={4}
              >
                <SelectItem className="hover:bg-primary-gray-100/60" value="1">
                  Personal Errands
                </SelectItem>
                <SelectItem
                  className="border-none hover:bg-primary-gray-100/60"
                  value="2"
                >
                  Urgent To-Do
                </SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAdd}>New Task</Button>
          </div>
          <div className="custom-scrollbar h-full overflow-hidden overflow-y-auto pb-4">
            <Accordion
              type="single"
              collapsible
              value={
                (task.some((item) => item.id === taskId && item.title === "") &&
                  taskId) ||
                undefined
              }
            >
              {task.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger asChild>
                    <div className="hover:bg-primary-gray-100/60">
                      <div className="flex max-w-[60%] items-center gap-3">
                        <Checkbox
                          checked={item.completed}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusToggle(item.id);
                          }}
                        />
                        {item.title === "" ? (
                          <input
                            type="text"
                            className="rounded border border-primary-gray-200 px-3 py-2 font-bold"
                            value={title}
                            ref={titleRef}
                            placeholder="Type Task Title"
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => handleTitleChange(item.id)}
                          />
                        ) : (
                          <label
                            className={`ml-2 line-clamp-2 font-bold text-primary-gray-300 ${
                              item.completed
                                ? "line-through"
                                : "line-through-none"
                            }`}
                          >
                            {item.title}
                          </label>
                        )}
                      </div>
                      <div className="flex h-fit min-w-fit items-center gap-3">
                        {!item.completed && countDaysLeft(item.dueDate) < 3 && (
                          <p className="text-indicator-red">
                            {countDaysLeft(item.dueDate)} Days left
                          </p>
                        )}
                        {new Date(item.dueDate).toLocaleDateString("id-ID")}
                        <ChevronDown className="chevron-down h-4 w-4 shrink-0 transition-transform duration-200" />
                        <div
                          className="flex"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Popover>
                            <PopoverTrigger>
                              <EllipsisIcon className="fill-primary-gray-300" />
                            </PopoverTrigger>
                            <PopoverContent
                              side="bottom"
                              sideOffset={10}
                              align="end"
                              className="cursor-pointer px-3 py-2 hover:bg-primary-gray-100/60"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="ml-10">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <ClockIcon
                          className={`h-4 w-4 ${item.dueDate === "" && "fill-primary-gray-300"}`}
                        />
                        <input
                          type="date"
                          value={item.dueDate}
                          min={new Date().toISOString().split("T")[0]}
                          placeholder="Set Date"
                          className="date-input rounded border border-primary-gray-200 px-3 py-2"
                          onChange={(e) =>
                            handleDateChange(item.id, e.target.value)
                          }
                        />
                      </div>
                      <div className="flex gap-3">
                        <PencilIcon
                          className={`h-4 w-4 min-w-fit ${item.title === "" && item.description === "" && "fill-primary-gray-300"}`}
                          onClick={() => {
                            setEditing(item.id);
                            setDesc(item.description);
                          }}
                        />
                        {editing === item.id ? (
                          <textarea
                            rows={1}
                            maxLength={1000}
                            value={desc}
                            ref={inputRef}
                            placeholder="no description"
                            className={`scrollbar-hidden mr-1 flex max-h-12 flex-1 resize-none rounded p-1 ring-primary-gray-200 focus:outline-none focus:ring-1`}
                            onChange={(e) => setDesc(e.target.value)}
                            onBlur={() => handleDescriptionChange(item.id)}
                          />
                        ) : (
                          <p
                            className="line-clamp-3 text-primary-gray-300"
                            onClick={() => {
                              setDesc(item.description);
                              setEditing(item.id);
                            }}
                          >
                            {item.description || "No description"}
                          </p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </>
      )}
    </>
  );
};

export default ToDo;
