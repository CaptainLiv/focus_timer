"use client";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";

type TimerProps = {
    limit: number;
};

export default function Timer({ limit }: TimerProps) {
    const [minutes, setMinutes] = useState(0);
    const [paused, setPaused] = useState(true);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const countdown = () => {
            if (!paused) {
                if (minutes < limit) {
                    setMinutes(minutes + 1);
                } else {
                    setPaused(true);
                    (new Audio("timer_alert.mp3")).play();
                    setOpen(true)
                    setMinutes(0)
                }
            }
        };
        setTimeout(countdown, 1000);
    }, [minutes, paused]);
    return (
        <div className="text-5xl font-bold text-black dark:text-white flex flex-col items-center justify-center gap-4">
            <Dialog onClose={() => setOpen(false)} open={open}>
                Your ${limit} minute timer is over
            </Dialog>
            {limit - minutes}
            <Button variant={paused ? "contained" : "outlined"} onClick={() => setPaused(!paused)} className="w-20">
                {paused ? "Start" : "Stop"}
            </Button>
        </div>
    );
}