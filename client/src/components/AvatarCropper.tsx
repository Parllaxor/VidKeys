import { useEffect, useRef, useState } from "react";
import { Check, X, ZoomIn, ZoomOut } from "lucide-react";

interface Props {
    image: string;
    onSave: (croppedImage: string) => void;
    onCancel: () => void;
}

function AvatarCropper({ image, onSave, onCancel }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const dragStart = useRef({ x: 0, y: 0 });
    const positionStart = useRef({ x: 0, y:0 });

    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);

    const cropSize = 300;

    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            imageRef.current = img;
            drawPreview();
        };

        img.src = image;
    }, [image]);

    useEffect(() => {
        drawPreview();
    }, [zoom, position]);

    const drawPreview = () => {
        const canvas = canvasRef.current;
        const img = imageRef.current;

        if (!canvas || !img) {
            return;
        }

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        canvas.width = cropSize;
        canvas.height = cropSize;

        ctx.clearRect(0, 0, cropSize, cropSize);

        ctx.save();

        ctx.beginPath();
        ctx.arc(
            cropSize / 2,
            cropSize / 2,
            cropSize / 2,
            0,
            Math.PI * 2
        );
        ctx.clip();

        const scale = Math.max(
            cropSize / img.width,
            cropSize / img.height
        ) * zoom;

        const width = img.width * scale;
        const height = img.height * scale;

        const x = (cropSize - width) / 2 + position.x;
        const y = (cropSize - height) / 2 + position.y;

        ctx.drawImage(img, x, y, width, height);

        ctx.restore();
    };

    const handleSave = () => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const croppedImage = canvas.toDataURL("image/png");

        onSave(croppedImage);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setDragging(true);

        dragStart.current = {
            x: event.clientX,
            y: event.clientY,
        };

        positionStart.current = {
            x: position.x,
            y: position.y,
        };
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!dragging || !imageRef.current) {
            return;
        }

        const deltaX = event.clientX - dragStart.current.x;
        const deltaY = event.clientY - dragStart.current.y;

        const img = imageRef.current;

        if (!img) {
            return;
        }

        const scale = Math.max(
            cropSize / img.width,
            cropSize / img.height
        ) * zoom;

        const width = img.width * scale;
        const height = img.height * scale;

        const maxX = Math.max(0, (width - cropSize) / 2);
        const maxY = Math.max(0, (height - cropSize) / 2);

        const newX = positionStart.current.x + deltaX;
        const newY = positionStart.current.y + deltaY;

        setPosition({
            x: Math.max(-maxX, Math.min(maxX, newX)),
            y: Math.max(-maxY, Math.min(maxY, newY)),
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Adjust your avatar
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Zoom and position your image until it looks right.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="overflow-hidden rounded-full border-2 border-cyan-400/40 bg-slate-900 shadow-xl shadow-cyan-500/10">
                        <canvas
                            ref={canvasRef}
                            width={cropSize}
                            height={cropSize}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            className={`h-72 w-72 ${
                                dragging ? "cursor-grabbing" : "cursor-grab"
                            }`}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                        <ZoomOut className="h-4 w-4" />

                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.01"
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="mx-4 w-full accent-cyan-400"
                        />

                        <ZoomIn className="h-4 w-4" />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300"
                    >
                        <Check className="h-4 w-4" />
                        Use this crop
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AvatarCropper;