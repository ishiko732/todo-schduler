"use client";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { TodoDeck } from "@todo/components/todo";
import { useDrag } from "@todo/hooks/useSchedulerDrag";
import { TodoData } from "@todo/model";
import getInitialData from "@todo/model/init.data";
import { VERSION } from "@todo/model/version";
import { FSRSParameters, fsrs, generatorParameters } from "ts-fsrs";
import { TodoAdd } from "@todo/components/TodoAdd";
import { TodoProvider } from "@todo/context/TodoContext";

export default function TodoPage() {
  const { todos, fsrs } = getStorage();
  const [state, onDragEnd, setState] = useDrag(todos, fsrs);

  return (
    <TodoProvider todos={state} setTodos={setState}>
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoDeck decks={state} />
        <TodoAdd setState={setState} />
      </DragDropContext>
    </TodoProvider>
  );
}

function getStorage() {
  const todos_str = localStorage.getItem("todos");
  const fsrs_params = localStorage.getItem("params");
  let todos: TodoData | null = null;
  let params: FSRSParameters | null = null;
  if (todos_str) {
    todos = JSON.parse(todos_str);
  }
  if (todos?.version !== VERSION) {
    todos = getInitialData();
  }

  if (fsrs_params) {
    params = JSON.parse(fsrs_params);
  }
  if (!params) {
    params = generatorParameters();
  }
  return { todos, fsrs: fsrs(params) };
}
