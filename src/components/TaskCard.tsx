import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import type { Task } from "@/types";
import { Button } from "./ui/button";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";

interface Props {
  task: Task;
}
const TaskCard = ({ task }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  return (
    <Item
      className="task-item"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <ItemContent>
        <ItemTitle className="text-white">{task.content}</ItemTitle>{" "}
      </ItemContent>
      <ItemActions>
        {mouseIsOver && (
          <Button variant="ghost" size="icon" className="column-container-btn">
            <Trash2Icon />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
};
export default TaskCard;
