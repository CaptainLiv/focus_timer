import SoundBit from "./soundbit";

export default function Sounds() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-5xl font-bold text-black dark:text-white">Sounds</h1>
            <div className="flex grid grid-cols-5 gap-4">
                <SoundBit name="rain" />
                <SoundBit name="rain" />
                <SoundBit name="rain" />
            </div>
        </div>
    );
}