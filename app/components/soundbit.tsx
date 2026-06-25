"use client";
import { Slider, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";

type SoundbitProps = {
    name: string;
}

export default function SoundBit({ name }: SoundbitProps) {
    const [selected, setSelected] = useState(false);
    const [volume, setVolume] = useState(50);
    const audio: HTMLAudioElement = new Audio(`/sounds/${name}.mp3`);

    useEffect(() => {
        if (selected) {
            audio.play();
        }
        else {
            audio.pause();
        }
    }, [selected])

    return (
        <div>
            <ToggleButton value="enabled" selected={selected} onChange={(event, newSelected) => { setSelected(!selected) }}>
                {name}
            </ToggleButton>
            {selected ? <Slider value={volume} onChange={(e, newValue) => { setVolume(newValue as number); audio.volume = (newValue as number) / 100; }} aria-label="Volume" valueLabelDisplay="auto" size="small" /> : <Slider value={volume} onChange={(e, newValue) => { setVolume(newValue as number); audio.volume = (newValue as number) / 100; }} aria-label="Volume" valueLabelDisplay="auto" size="small" disabled />}
        </div>
    );
}