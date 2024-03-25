import { TodoData } from "@todo/model";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function TodoAdd({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<TodoData>>;
}) {
  const [control, setControl] = useState("⌘"); // display control key
  const todoRef = useRef<HTMLInputElement>(null); // input ref
  const addTodohandler = useCallback(
    (event: KeyboardEvent) => {
      if (!todoRef.current) {
        return;
      }
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        todoRef.current.value
      ) {
        console.log(true);
        const todo = todoRef.current.value;
        setState((prev) => {
          const item = {
            id: uuidv4(),
            text: todo,
          };
          const newState: TodoData = {
            ...prev,
            columns: {
              ...prev.columns,
              ["TODO"]: {
                ...prev.columns["TODO"],
                items: [...prev.columns["TODO"].items, item],
              },
            },
          };
          localStorage.setItem("todos", JSON.stringify(newState));
          console.log(newState);
          return newState;
        });
      }
    },
    [setState]
  ); // add todo handler

  useEffect(() => {
    setControl(OSCheck()); // set control key
    document.addEventListener("keydown", addTodohandler);
    return () => {
      document.removeEventListener("keydown", addTodohandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <label className="input input-bordered input-lg flex items-center gap-2 w-1/3">
        <input
          type="text"
          className="grow"
          placeholder="Add TODO"
          ref={todoRef}
        />
        <span>
          <kbd className="kbd">{control}</kbd>
          <kbd className="kbd">Enter</kbd>
        </span>
      </label>
    </div>
  );
}

function OSCheck() {
  var agent = navigator.userAgent.toLowerCase();
  var isMac = /macintosh|mac os x/i.test(agent);
  if (isMac) {
    return "⌘";
  } else {
    return "Ctrl";
  }
}
