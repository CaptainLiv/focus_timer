"use client";
import Image from "next/image";
import Timer from "./components/timer";
import { useState } from "react";
import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Todo from "./components/todo";
import Sounds from "./components/sounds";

export default function Home() {
  const [state, setState] = useState(0);
  return (
    <div className="flex min-h-screen flex-row">
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <ToggleButtonGroup value={state} onChange={(_, value) => { if (value !== null) setState(value) }} color="primary" exclusive sx={{ "& .Mui-disabled": { color: "white" }, "& .Mui-selected": { color: "white", backgroundColor: "#1976d2" } }}>
          <ToggleButton value={0}>Focus</ToggleButton>
          <ToggleButton value={1}>Short Break</ToggleButton>
          <ToggleButton value={2}>Long Break</ToggleButton>
        </ToggleButtonGroup>
        {state === 0 && <Timer limit={25} />}
        {state === 1 && <Timer limit={5} />}
        {state === 2 && <Timer limit={15} />}
      </div>
      <Todo />
      <Sounds />
    </div>
  );
}
