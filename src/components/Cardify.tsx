import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { CirclePlusIcon } from "lucide-react";
import type { Column, Id } from "@/types";
import { generateId } from "@/lib/utils";
import ColumnContainer from "./ColumnContainer";
import { DndContext, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const Cardify = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }
  }
  return (
    <div className="cardify-container">
      <DndContext onDragStart={onDragStart}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
          <Button className="cardify-btn" onClick={() => createNewColumn()}>
            <CirclePlusIcon className="" />
            Add Column
          </Button>
        </div>
      </DndContext>
    </div>
  );
};

export default Cardify;
