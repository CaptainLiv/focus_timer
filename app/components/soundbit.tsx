"use client";
import { Slider, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";

type SoundbitProps = {
    name: string;
}

export default function SoundBit({ name }: SoundbitProps) {
    const [selected, setSelected] = useState(false);
    const [volume, setVolume] = useState(50);
    const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)

    useEffect(() => {
        audio?.pause()
        setAudio(new Audio(`/sounds/${name}`))
    }, [])

    useEffect(() => {
        if (selected && audio?.paused) {
            audio?.play();
        }
        else {
            audio?.pause();
        }
    }, [selected])

    return (
        <div>
            <ToggleButton value="enabled" selected={selected} onChange={(event, newSelected) => { setSelected(!selected) }}>
                {name.split(".")[0]}
            </ToggleButton>
            {selected ? <Slider value={volume} onChange={(e, newValue) => { setVolume(newValue as number); if (audio !== undefined) { audio.volume = (newValue as number) / 100; } }} aria-label="Volume" valueLabelDisplay="auto" size="small" /> : <Slider value={volume} onChange={(e, newValue) => { setVolume(newValue as number); if (audio !== undefined) { audio.volume = (newValue as number) / 100; } }} aria-label="Volume" valueLabelDisplay="auto" size="small" disabled />}
        </div>
    );
}