import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import type { Id, Task } from "@/types";
import { Button } from "./ui/button";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}
const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function toggleEditMode() {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  }

  if (editMode) {
    return <>Edit Mode</>;
  }

  return (
    <Item
      className="task-item"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <ItemContent>
        <ItemTitle className="text-white">{task.content}</ItemTitle>{" "}
        <Textarea
          className="text-area"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) toggleEditMode();
          }}
        />
      </ItemContent>
      <ItemActions></ItemActions>
    </Item>
  );
};
export default TaskCard;
