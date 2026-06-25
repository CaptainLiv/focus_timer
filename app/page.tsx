"use client";
import Image from "next/image";
import Timer from "./components/timer";
import { useMemo, useState } from "react";
import { Button, ButtonGroup, ThemeProvider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Todo from "./components/todo";
import Sounds from "./components/sounds";
import { getTheme } from "./theme";
import Pomodoro from "./components/pomodoro";

export default function Home() {
  const [mode] = useState<"light" | "dark">("dark");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen max-w-screen f-screen flex-row">
        <div className="flex flex-col flex-1 items-center justify-center font-sans w-1/2 m-4 gap-8">
          <Pomodoro />
          <Sounds />
        </div>
        <Todo />

      </div>
    </ThemeProvider>
  );
}
