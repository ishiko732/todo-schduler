"use client";

import { reorderList } from "@todo/components/todo/recorder";
import { TodoData, TodoItem } from "@todo/model";
import getInitialData from "@todo/model/init.data";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
  Card,
  FSRS,
  Grade,
  Rating,
  RecordLog,
  createEmptyCard,
  fsrs,
} from "ts-fsrs";

function scheduledHandler(grade: Grade, recordLog: RecordLog) {
  const card = recordLog[grade].card;
  if (card.scheduled_days === 0) {
    card.scheduled_days = 1;
    card.due = new Date(card.due.getTime() + 24 * 60 * 60 * 1000);
  }
  return card;
}

export function useDrag(
  initial: TodoData = getInitialData(),
  f: FSRS = fsrs()
) {
  const [state, setState] = useState(() => initial);
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.type === "column") {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index
      );
      setState({
        ...state,
        columnOrder,
      });
      return;
    }

    // reordering in same list
    const srcId = result.source.droppableId;
    const destId = result.destination.droppableId;
    if (srcId === destId) {
      const column = state.columns[result.source.droppableId];
      const items = reorderList(
        column.items,
        result.source.index,
        result.destination.index
      );
      // updating column entry
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            items,
          },
        },
      };
      localStorage.setItem("todos", JSON.stringify(newState));
      setState(newState);
      return;
    }

    // moving between lists
    const sourceColumn = state.columns[srcId];
    const destinationColumn = state.columns[destId];
    const doneColumn = state.columns["DONE"];
    // 0. if destId = schduler
    const oldItem = sourceColumn.items[result.source.index];
    let scheduled_flag = false;
    let newItem: TodoItem = { ...oldItem };
    if (destId === "SCHEDULER") {
      const card = newItem.scheduler ?? createEmptyCard<Card>();
      const scheduledHandler_Good = scheduledHandler.bind(null, Rating.Good);
      const scheduled = f.repeat<Card>(card, new Date(), scheduledHandler_Good);
      newItem.scheduler = scheduled;
      newItem.id = `id:${new Date().getTime()}`;
      scheduled_flag = true;
    }

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    };
    newSourceColumn.items.splice(result.source.index, 1);

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    };

    // 3. update done column or TODO column
    if (scheduled_flag && srcId === "TODO") {
      doneColumn.items.push(oldItem);
    }
    // in line modification of items
    newDestinationColumn.items.splice(result.destination.index, 0, newItem);

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        ["DONE"]: doneColumn,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    localStorage.setItem("todos", JSON.stringify(newState));
    setState(newState);
  }

  return [state, onDragEnd, setState] as const;
}
