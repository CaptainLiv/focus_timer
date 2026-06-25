"use client";
import { Slider, ToggleButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type SoundbitProps = {
    name: string;
    /** Returns the shared AudioContext + AnalyserNode from the parent */
    getSharedAnalyser: () => { ctx: AudioContext; analyser: AnalyserNode };
};

export default function SoundBit({ name, getSharedAnalyser }: SoundbitProps) {
    const [selected, setSelected] = useState(false);
    const [volume, setVolume] = useState(50);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    useEffect(() => {
        const audio = new Audio(`/sounds/${name}`);
        audio.volume = volume / 100;
        audioRef.current = audio;

        return () => {
            audio.pause();
            sourceRef.current?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (selected) {
            const { ctx, analyser } = getSharedAnalyser();

            // Connect this audio element into the shared analyser graph on first play
            if (!sourceRef.current) {
                const source = ctx.createMediaElementSource(audio);
                source.connect(analyser);
                sourceRef.current = source;
            }

            ctx.resume();
            audio.loop = true;
            audio.play();
        } else {
            audio.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    function handleVolumeChange(_: Event, newValue: number | number[]) {
        const val = newValue as number;
        setVolume(val);
        if (audioRef.current) audioRef.current.volume = val / 100;
    }

    return (
        <div className="flex flex-col">
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => setSelected((s) => !s)}
            >
                {name.split(".")[0].replace("_", " ")}
            </ToggleButton>

            <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                valueLabelDisplay="auto"
                size="small"
                disabled={!selected}
            />
        </div>
    );
}