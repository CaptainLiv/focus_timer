"useClient"
import { useEffect, useState } from "react";
import SoundBit from "./soundbit";

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
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-5xl font-bold text-black dark:text-white">Sounds</h1>
            <div className="flex grid grid-cols-5 gap-4">
                {sounds.map((sound) => (
                    <SoundBit key={sound} name={sound} />
                ))}
            </div>
        </div>
    );
}