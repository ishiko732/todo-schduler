"use client";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { TodoDeck } from "@todo/components/todo";
import { useDrag } from "@todo/hooks/useDrag";

export default function TodoPage() {
  const [state, onDragEnd ] = useDrag();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <TodoDeck decks={state} />
      </div>
    </DragDropContext>
  );
}