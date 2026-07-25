import type { Decoration } from "../room/decorations";

interface Props {
    decoration: Decoration;
}

function DecorationRenderer({ decoration }: Props) {
    switch (decoration.type) {
        case "couch":
            return (
                <div
                    className="
                        w-full
                        h-full
                        bg-slate-600
                        rounded-lg
                    "
                />
            );

        case "window":
            return (
                <div
                    className="
                        w-full
                        h-full
                        bg-blue-400
                        rounded-md
                    "
                />
            );

        case "plant":
            return (
                <div
                    className="
                        w-full
                        h-full
                        bg-green-500
                        rounded-full
                    "
                />
            );
        default:
            return null;
    }
}

export default DecorationRenderer;