// Recommended react-window performance optimisation: memoize the row render function
"use client";
import { Draggable } from "react-beautiful-dnd";
import { areEqual } from "react-window";
import { Item, TRowProps } from ".";
import React from "react";

// Recommended react-window performance optimisation: memoize the row render function
// Things are still pretty fast without this, but I am a sucker for making things faster
export const Row = React.memo(function Row(props: TRowProps) {
  const { data: items, index, style } = props;
  const item = items[index];

  // We are rendering an extra item for the placeholder
  if (!item) {
    return null;
  }

  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided, snapshot) => (
        <Item
          provided={provided}
          snapshot={snapshot}
          item={item}
          style={style}
        />
      )}
    </Draggable>
  );
}, areEqual);
