"use client";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ItemList, TColumnProps } from ".";

export const Column = React.memo(function Column({
  column,
  index,
}: TColumnProps) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h3 className="column-title" {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <ItemList column={column} index={index} />
        </div>
      )}
    </Draggable>
  );
});


