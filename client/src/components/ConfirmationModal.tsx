import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText,
    onConfirm,
    onCancel,
}: ConfirmationModalProps) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            px-4
            backdrop-blur-sm
            modal-backdrop
        ">
            <div className="
                w-full
                max-w-md
                rounded-3xl
                border
                border-slate-700
                bg-[#111827]
                p-6
                shadow-[0_0_40px_rgba(0,0,0,0.5)]
                modal-content
            ">

                <div className="flex items-start gap-4">

                    <div className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-red-400/30
                        bg-red-500/10
                        shadow-[0_0_18px_rgba(248,113,113,0.12)]
                    ">
                        <AlertTriangle className="h-6 w-6 text-red-400" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="
                            text-xl
                            font-semibold
                            text-white
                        ">
                            {title}
                        </h2>

                        <p className="
                            mt-2
                            text-sm
                            leading-6
                            text-slate-400
                        ">
                            {message}
                        </p>
                    </div>

                </div>

                <div className="
                    mt-6
                    flex
                    justify-end
                    gap-3
                ">

                    <button
                        type="button"
                        onClick={onCancel}
                        className="
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-900/80
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-slate-300
                            transition-all
                            duration-200
                            hover:border-cyan-400/50
                            hover:bg-slate-800
                            hover:text-cyan-300
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="
                            rounded-xl
                            border
                            border-red-400/30
                            bg-red-500/90
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-[0_0_14px_rgba(248,113,113,0.15)]
                            transition-all
                            duration-200
                            hover:border-red-300/50
                            hover:bg-red-500
                            hover:shadow-[0_0_20px_rgba(248,113,113,0.25)]
                        "
                    >
                        {confirmText}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ConfirmationModal;