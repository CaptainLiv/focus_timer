"use client";
import { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";
import Todo from "./components/todo";
import Sounds from "./components/sounds";
import { getTheme } from "./theme";
import Pomodoro from "./components/pomodoro";


export default function Home() {
  const [mode] = useState<"light" | "dark">("dark");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen max-w-screen f-screen md:flex-row flex-col">
        <div className="flex flex-col flex-1 items-center justify-center font-sans md:w-1/2 m-2 gap-4">
          <Pomodoro />
          <Sounds />
        </div>
        <Todo />

      </div>
    </ThemeProvider>
  );
}
