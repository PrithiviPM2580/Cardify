import type { Column, Id, Task } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CirclePlusIcon, Trash2Icon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  tasks,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="column-container opacity-40 border-2 border-rose-500"
      ></div>
    );
  }
  return (
    <Card className="column-container p-0" ref={setNodeRef} style={style}>
      <CardTitle
        className="column-container-title"
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
      >
        <div className="flex items-center justify-start gap-2">
          <div className="column-container-number">0</div>
          {!editMode && column.title}
          {editMode && (
            <Input
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  setEditMode(false);
                }
              }}
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              className="column-container-input"
            />
          )}
        </div>
        <CardAction>
          <Button
            className="column-container-btn"
            variant="ghost"
            size="icon"
            onClick={() => deleteColumn(column.id)}
          >
            <Trash2Icon />
          </Button>
        </CardAction>
      </CardTitle>
      <CardContent className="column-container-content">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </CardContent>
      <CardFooter>
        <Button
          className="column-container-footer-btn"
          onClick={() => createTask(column.id)}
        >
          <CirclePlusIcon />
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ColumnContainer;
