"use client";
import { useEffect, useRef, useState } from "react";
import SoundBit from "./soundbit";
import SpectrumBars from "./spectrumBars";
import { Paper, Typography } from "@mui/material";

export default function Sounds() {
    const [sounds, setSounds] = useState<string[]>([]);
    const [analyserReady, setAnalyserReady] = useState(false);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);

    function getOrCreateSharedAnalyser(): { ctx: AudioContext; analyser: AnalyserNode } {
        if (audioCtxRef.current && analyserRef.current) {
            return { ctx: audioCtxRef.current, analyser: analyserRef.current };
        }
        const ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.connect(ctx.destination);
        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        // Trigger render so SpectrumBars mounts
        setAnalyserReady(true);
        return { ctx, analyser };
    }

    useEffect(() => {
        fetchSounds();
        return () => {
            audioCtxRef.current?.close();
        };
    }, []);

    async function fetchSounds() {
        const res = await fetch("/api/sound");
        const data: string[] = await res.json();
        setSounds(data);
    }

    return (
        <Paper className="flex flex-col items-center justify-start h-1/2 p-4">
            <Typography variant="h1">Sounds</Typography>


            <div className="flex flex-row flex-wrap gap-2">
                {sounds.map((sound, index) => (
                    <SoundBit
                        key={index}
                        name={sound}
                        getSharedAnalyser={getOrCreateSharedAnalyser}
                    />
                ))}
            </div>
            {analyserReady && analyserRef.current && (
                <SpectrumBars analyser={analyserRef.current} />
            )}
        </Paper>
    );
}