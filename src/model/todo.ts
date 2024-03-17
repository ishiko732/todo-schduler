type TodoItem = {
  id: string;
  text: string;
};

type TodoColumn = {
  id: string;
  title: string;
  items: TodoItem[];
};

type TodoData = {
  columns: {
    [key: string]: TodoColumn;
  };
  columnOrder: string[];
};

export type { TodoItem, TodoColumn, TodoData };
