"use client";
import { useState, useEffect } from "react";

export function LocalStoragePage({ children }: { children: React.ReactNode }) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);
  return display ? children : <Loading />;
}

function Loading() {
  return <span className="loading loading-bars loading-lg"></span>;
}
