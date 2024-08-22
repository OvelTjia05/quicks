import Messaging from "../Messsaging";
import ToDo from "../ToDo";

const PopUp: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="absolute bottom-[85px] h-[70vh] max-h-[737px] w-[45vw] max-w-[734px] overflow-hidden rounded bg-white px-8 py-6 text-background">
      {type === "Inbox" ? <Messaging /> : <ToDo />}
    </div>
  );
};

export default PopUp;
