"use client";
import { ToggleButtonGroup, ToggleButton, Paper, Typography } from "@mui/material"
import Timer from "./timer"
import { useState } from "react";

export default function Pomodoro() {
    const [state, setState] = useState(0);
    return (
        <Paper className="flex flex-col flex-1 items-center justify-center font-sans w-1/1 h-1/2 gap-2">
            <Typography variant="h1">Timer</Typography>
            <ToggleButtonGroup value={state} onChange={(_, value) => { if (value !== null) setState(value) }} color="primary" exclusive sx={{ "& .Mui-disabled": { color: "white" }, "& .Mui-selected": { color: "white", backgroundColor: "#1976d2" } }}>
                <ToggleButton value={0} className="w-32">Focus</ToggleButton>
                <ToggleButton value={1} className="w-32">Short Break</ToggleButton>
                <ToggleButton value={2} className="w-32">Long Break</ToggleButton>
            </ToggleButtonGroup>
            {state === 0 && <Timer limit={25} />}
            {state === 1 && <Timer limit={5} />}
            {state === 2 && <Timer limit={15} />}
        </Paper>
    )
}