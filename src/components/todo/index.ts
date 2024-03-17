import { TodoColumn, TodoItem } from "@todo/model";

export * from "./utils"
export * from "./TodoItem"
export * from "./TodoRow"
export * from "./TodoList"
export * from "./TodoColumn";
export * from "./TodoDeck"

export type TColumnProps = {
  column: TodoColumn;
  index: number;
};

export type TRowProps = {
  data: TodoItem[];
  index: number;
  style?: React.AllHTMLAttributes<HTMLDivElement>["style"];
};