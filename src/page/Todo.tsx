"use client";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { TodoDeck } from "@todo/components/todo";
import { useDrag } from "@todo/hooks/useSchedulerDrag";

export default function TodoPage() {
  const [state, onDragEnd] = useDrag();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <TodoDeck decks={state} />
    </DragDropContext>
  );
}