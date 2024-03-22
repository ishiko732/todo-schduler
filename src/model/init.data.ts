import { TodoItem, TodoData } from ".";
import { VERSION } from "./version";

let uniqueId = 1;
function getItems(count: number): TodoItem[] {
  return Array.from({ length: count }, (v, k) => {
    const id = uniqueId++;
    return {
      id: `id:${id}`,
      text: `item ${id}`,
    };
  });
}

const initial: TodoData = {
  columns: {
    TODO: {
      id: "TODO",
      title: "TODO",
      items: getItems(4),
    },
    DONE: {
      id: "DONE",
      title: "DONE",
      items: getItems(5),
    },
    SCHEDULER: {
      id: "SCHEDULER",
      title: "SCHEDULER",
      items: [],
    },
  },
  columnOrder: ["TODO", "DONE", "SCHEDULER"],
  version: VERSION,
};

export default function getInitialData() {
  return initial;
}
