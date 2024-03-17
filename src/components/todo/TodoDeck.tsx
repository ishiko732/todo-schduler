"use client";

import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Column } from ".";
import { TodoData } from "@todo/model";

export function TodoDeck({ decks }: { decks: TodoData }) {
  return (
    <Droppable
      droppableId="all-droppables"
      direction="horizontal"
      type="column"
    >
      {(provided) => (
        <div
          className="columns"
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
  );
}
