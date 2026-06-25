"use client";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, Typography } from "@mui/material";

type TimerProps = {
    limit: number;
};

export default function Timer({ limit }: TimerProps) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(60)
    const [paused, setPaused] = useState(true);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const countdown = () => {
            if (!paused) {
                if (minutes < limit) {
                    setSeconds(seconds + 1)
                    if (seconds + 1 >= 60) {
                        setMinutes(minutes + 1);
                        setSeconds(1)
                    }
                } else {
                    setPaused(true);
                    const alarm = new Audio("timer_alert.mp3");
                    alarm.volume = 0.5;
                    alarm.play();
                    setOpen(true)
                    setMinutes(0)
                    setSeconds(60)
                }
            }
        };
        setTimeout(countdown, 1000);
    }, [minutes, paused, seconds]);
    return (
        <div className="text-5xl font-bold text-black dark:text-white flex flex-col items-center justify-center gap-4">
            <Dialog onClose={() => setOpen(false)} open={open}>
                Your ${limit} minute timer is over
            </Dialog>
            <div className="w-full font-mono">
                {limit - minutes}:{String(60 - seconds).padStart(2, "0")}
            </div>
            <Button variant={paused ? "contained" : "outlined"} onClick={() => setPaused(!paused)} className="w-20">
                {paused ? "Start" : "Stop"}
            </Button>
        </div>
    );
}