import { TodoItem, TodoData } from ".";

let uniqueId = 0;
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
    "column-0": {
      id: "column-0",
      title: "TODO",
      items: getItems(10),
    },
    "column-1": {
      id: "column-1",
      title: "DONE",
      items: getItems(20),
    },
    "column-2": {
      id: "column-2",
      title: "SCHEDULER",
      items: getItems(20),
    },
  },
  columnOrder: ["column-0", "column-1", "column-2"],
};

export default function getInitialData() {
  return initial;
}
