"use client";

import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Column } from ".";
import { TodoData } from "@todo/model";
import { clsx } from "clsx";

export function TodoDeck<T extends string>({
  decks,
  className,
}: {
  decks: TodoData;
  className?: string;
}) {
  return (
    <div className={clsx("todo-deck", className)}>
      <Droppable
        droppableId="all-droppables"
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <div
            className={clsx("columns", className)}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {decks.columnOrder.map((columnId, index) => (
              <Column
                key={columnId}
                column={decks.columns[columnId]}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
