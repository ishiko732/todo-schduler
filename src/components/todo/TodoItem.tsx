import { TodoItem } from "@todo/model";
import { getStyle } from ".";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
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
      {item.text}
    </div>
  );
}
