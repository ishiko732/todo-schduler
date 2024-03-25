"use client";
import { TodoItem } from "@todo/model";
import { getStyle } from ".";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useTodoContext } from "@todo/context/TodoContext";
export function Item({
  provided,
  snapshot,
  item,
  style,
}: {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  item: TodoItem;
  style?: React.AllHTMLAttributes<HTMLDivElement>["style"];
}) {
  const { todos, setTodos } = useTodoContext();
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging: snapshot.isDragging,
      })}
      className={`item ${snapshot.isDragging ? "is-dragging" : ""}`}
    >
      <div>
        <p className=" grid grid-flow-col items-center gap-2 content-start grid-auto">
          <div>{item.text}</div>
          <div className=" justify-self-end">
            <DeleteTodo />
          </div>
        </p>
        {item.scheduler ? (
          <p className="text-sm">next:{item.scheduler?.due?.format()}</p>
        ) : null}
      </div>
    </div>
  );
}

function DeleteTodo() {
  return (
    <button className="btn btn-circle btn-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
