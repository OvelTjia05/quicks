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

const toDoList = [
  {
    id: "1",
    title: "Close off Case #012920- RODRIGUES, Amiguel",
    dueDate: "2024-08-24",
    description:
      "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    status: "finished",
  },
  {
    id: "2",
    title: "Close off Case #012920- RODRIGUES, Amiguel",
    dueDate: "2024-08-23",
    description:
      "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    status: "unfinished",
  },
  {
    id: "3",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni voluptatum dolores atque vero quas doloremque placeat aliquid reprehenderit in? Facere.",
    dueDate: "2024-08-25",
    description:
      "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    status: "finished",
  },
];

const ToDo = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [task, setTask] = useState(toDoList);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [editing]);

  task.sort((a, b) => {
    if (a.title === "" && b.title !== "") return 1;
    else if (a.title !== "" && b.title === "") return -1;
    else if (a.status === "unfinished" && b.status === "finished") return -1;
    else if (a.status === "finished" && b.status === "unfinished") return 1;
    else if (a.status === "finished" && b.status === "finished")
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
      status: "unfinished",
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
    console.log("yahaha");
    setEditing(null);
  };

  const handleStatusToggle = (id: string) => {
    setTask((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "finished" ? "unfinished" : "finished",
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
              <SelectContent className="-translate-x-1/4" sideOffset={4}>
                <SelectItem value="1">Personal Errands</SelectItem>
                <SelectItem className="border-none" value="2">
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
                    <div>
                      <div className="flex max-w-[60%] items-center gap-3">
                        <Checkbox
                          checked={item.status === "finished"}
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
                            placeholder="Type Task Title"
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => handleTitleChange(item.id)}
                          />
                        ) : (
                          <label
                            className={`ml-2 line-clamp-2 font-bold text-primary-gray-300 ${
                              item.status === "finished"
                                ? "line-through"
                                : "line-through-none"
                            }`}
                          >
                            {item.title}
                          </label>
                        )}
                      </div>
                      <div className="flex h-fit min-w-fit items-center gap-3">
                        {item.status === "unfinished" &&
                          countDaysLeft(item.dueDate) < 3 && (
                            <p className="text-indicator-red">
                              {countDaysLeft(item.dueDate)} Days left
                            </p>
                          )}
                        {item.dueDate}
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
                              className="px-3 py-2"
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
                        <div className="date-input-container relative inline-flex w-2 bg-red-300">
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
                      </div>
                      <div className="flex gap-3">
                        <PencilIcon
                          className={`h-4 w-4 min-w-fit ${editing && item.description === "" && "fill-primary-gray-300"}`}
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
