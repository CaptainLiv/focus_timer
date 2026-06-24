"use client";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

type TimerProps = {
    limit: number;
};

export default function Timer({ limit }: TimerProps) {
    const [minutes, setMinutes] = useState(0);
    const [paused, setPaused] = useState(true);

    useEffect(() => {
        const countdown = () => {
            if (!paused) {
                if (minutes < limit) {
                    setMinutes(minutes + 1);
                }
            }
        };
        setTimeout(countdown, 1000);
    }, [minutes, paused]);
    return (
        <div className="text-5xl font-bold text-black dark:text-white flex flex-col items-center justify-center gap-4">
            {limit - minutes}
            <Button variant={paused ? "contained" : "outlined"} onClick={() => setPaused(!paused)} className="w-20">
                {paused ? "Start" : "Stop"}
            </Button>
        </div>
    );
}