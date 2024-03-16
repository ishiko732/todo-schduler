"use client";
import TodoLibraryExample from "@todo/components/TodoLibraryExample";
import { TItems } from "@todo/model";
import { useState } from "react";

export default function TodoPage() {
  const [items, setItems] = useState<TItems>({
    todo: [...Array(5)].map((_, i) => ({
      index: i,
      id: `${i}${i}${i}`,
      title: `Title ${i + 1}000`,
      status: "todo",
    })),
    doing: [],
  });

  return (
    <>
      <TodoLibraryExample items={items} setItems={setItems} />
    </>
  );
}
