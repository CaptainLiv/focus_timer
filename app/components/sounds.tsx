"useClient"
import { useEffect, useState } from "react";
import SoundBit from "./soundbit";
import { Paper, Typography } from "@mui/material";

export default function Sounds() {
    const [sounds, setSounds] = useState<Array<string>>([])

    useEffect(() => {
        fetchSounds()
    }, [])

    async function fetchSounds() {

        const res = await fetch("/api/sound");
        const data: string[] = await res.json();
        setSounds(data)

    }

    return (
        <Paper className="flex flex-col flex-1 items-center justify-start  font-sans w-1/1  p-8 gap-8">
            <Typography variant="h1">Sounds</Typography>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4 overflow-y-auto">
                {sounds.map((sound, index) => (
                    <SoundBit key={index} name={sound} />
                ))}
            </div>
        </Paper>
    );
}