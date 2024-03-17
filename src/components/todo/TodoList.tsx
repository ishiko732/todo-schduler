"use client";
import React from "react";
import { useRef, useLayoutEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FixedSizeList } from "react-window";
import { Item, Row, TColumnProps } from ".";

export const ItemList = React.memo(function ItemList({
  column,
  index,
}: TColumnProps) {
  // There is an issue I have noticed with react-window that when reordered
  // react-window sets the scroll back to 0 but does not update the UI
  // I should raise an issue for this.
  // As a work around I am resetting the scroll to 0
  // on any list that changes it's index
  const listRef = useRef<FixedSizeList | null>(null);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTo(0);
    }
  }, [index]);

  return (
    <Droppable
      droppableId={column.id}
      mode="virtual"
      renderClone={(provided, snapshot, rubric) => (
        <Item
          provided={provided}
          snapshot={snapshot}
          item={column.items[rubric.source.index]}
        />
      )}
    >
      {(provided, snapshot) => {
        // Add an extra item to our list to make space for a dragging item
        // Usually the DroppableProvided.placeholder does this, but that won't
        // work in a virtual list
        const itemCount = snapshot.isUsingPlaceholder
          ? column.items.length + 1
          : column.items.length;

        return (
          <FixedSizeList
            height={500}
            itemCount={itemCount}
            itemSize={80}
            width={300}
            outerRef={provided.innerRef}
            itemData={column.items}
            className="task-list"
            ref={listRef}
          >
            {Row}
          </FixedSizeList>
        );
      }}
    </Droppable>
  );
});
