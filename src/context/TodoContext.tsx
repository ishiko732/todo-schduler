"use client";

import { TodoData } from "@todo/model";
import React from "react";

type TodoContextProps = {
  todos: TodoData;
  setTodos: React.Dispatch<React.SetStateAction<TodoData>>;
};

const TodoContext = React.createContext<TodoContextProps | undefined>(
  undefined
);
export function useTodoContext() {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error("TodoContext must be used within TodoContextProps");
  }
  return context;
}

export function TodoProvider({
  children,
  todos,
  setTodos,
}: { children: React.ReactNode } & TodoContextProps) {
  const value = React.useMemo(() => {
    return { todos, setTodos };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTodos]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
