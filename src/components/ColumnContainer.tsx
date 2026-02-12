import type { Column, Id } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = ({ column, deleteColumn }: Props) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <Card className="column-container p-0" ref={setNodeRef} style={style}>
      <CardTitle
        className="column-container-title"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center justify-start gap-2">
          <div className="column-container-number">0</div>
          {column.title}
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
      <CardContent className="column-container-content">Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};

export default ColumnContainer;
