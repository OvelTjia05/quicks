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
    title: "Close off Case #012920- RODRIGUES, Amiguel",
    dueDate: "2024-08-25",
    description:
      "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    status: "finished",
  },
];

const ToDo = () => {
  const countDaysLeft = (date: string) => {
    return new Date(date).getDate() - new Date().getDate();
  };

  return (
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
        <Button>New Task</Button>
      </div>
      {toDoList.map((item) => (
        <Accordion key={item.id} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.status === "finished"}
                  onChange={() => {
                    console.log("check");
                  }}
                />
                <label className="ml-2 line-clamp-2 font-bold text-primary-gray-300">
                  {item.title}
                </label>
                {countDaysLeft(item.dueDate) < 3 && (
                  <p className="text-indicator-red">
                    {countDaysLeft(item.dueDate)} Days left
                  </p>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default ToDo;
