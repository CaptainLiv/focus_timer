"use client";
import { useEffect, useRef } from "react";

type SpectrumBarsProps = {
    analyser: AnalyserNode;
    color?: string;
};

export default function SpectrumBars({
    analyser,
    color = "#B08D57",
}: SpectrumBarsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d")!;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                canvas.width = width;
                canvas.height = height;
            }
        });
        ro.observe(canvas);

        function draw() {
            rafRef.current = requestAnimationFrame(draw);

            const w = canvas ? canvas.width : 0;
            const h = canvas ? canvas.height : 0;

            ctx.clearRect(0, 0, w, h);

            analyser.getByteFrequencyData(dataArray);

            const barWidth = Math.max(1, (w / bufferLength) * 2.5);
            const gap = 1;
            let x = 0;

            ctx.fillStyle = color;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * h;
                ctx.fillRect(x, h - barHeight, barWidth, barHeight);
                x += barWidth + gap;
                if (x > w) break;
            }
        }

        draw();

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
        };
    }, [analyser, color]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "100%",
                height: "auto",
                background: "transparent",
                borderRadius: 4,
            }}
            aria-label="Audio spectrum visualizer"
        />
    );
}