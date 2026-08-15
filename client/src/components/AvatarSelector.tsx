import type { User } from "../users/user";
import { avatars, getAvatarById } from "../users/avatars";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ImagePlus, Sparkles, Trash2 } from "lucide-react";
import { getUserById, updateUser } from "../users/userDatabase";
import AvatarCropper from "./AvatarCropper"

interface Props {
    user?: User;
    onClose?: () => void;
}

function AvatarSelector({ user: initialUser, onClose }: Props) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | undefined>(() => initialUser ?? getUserById("test"));
    const [avatarId, setAvatarId] = useState(user?.avatarId ?? "default");
    const [uploadedImage, setUploadedImage] = useState<string | null>(user?.avatarUrl ?? null);
    const [uploadedAvatars, setUploadedAvatars] = useState<string[]>(
        user?.uploadedAvatars ?? []
    );

    if (!user) {
        return <div className="px-6 py-24 text-slate-300">User not found.</div>;
    }

    const previewImage = uploadedImage ?? getAvatarById(avatarId)?.image ?? getAvatarById(user.avatarId)?.image;
    const selectedAvatar = getAvatarById(avatarId) ?? getAvatarById(user.avatarId);
    const [cropImage, setCropImage] = useState<string | null>(null);

    const handleSave = () => {
        const updatedUser: User = {
            ...user,
            avatarId,
            avatarUrl: uploadedImage,
            uploadedAvatars,
            updatedAt: Date.now(),
        };

        updateUser(updatedUser);
        setUser(updatedUser);

        if (onClose) {
            onClose();
            return;
        }

        navigate("/profile");
    };

    const handleDelete = (avatarToDelete: string) => {

        if (avatarToDelete === uploadedImage) {
            return;
        }

        const updatedAvatars = uploadedAvatars.filter(
            (avatar) => avatar !== avatarToDelete
        );

        const updatedUser: User = {
            ...user,
            uploadedAvatars: updatedAvatars,
            updatedAt: Date.now(),
        };

        updateUser(updatedUser);
        setUser(updatedUser);
        setUploadedAvatars(updatedAvatars);
    };

    return (
        <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%)] px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-700 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8 lg:p-10">
                <button
                    onClick={() => (onClose ? onClose() : navigate("/profile"))}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to profile
                </button>

                <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6">
                        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
                            <Sparkles className="h-4 w-4" />
                            Avatar studio
                        </div>

                        <h2 className="mt-4 text-3xl font-semibold text-white">Choose a look that feels like you</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Pick a signature avatar for your profile, or upload a custom image to make it truly yours.
                        </p>

                        <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-950/70 p-5">
                            <div className="flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 p-3 text-cyan-300">
                                <img
                                    src={previewImage}
                                    alt={uploadedImage
                                        ? "Custom avatar"
                                        : selectedAvatar?.name ?? "Current avatar"}
                                    className="h-24 w-24 rounded-full object-cover"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-sm font-semibold text-white">
                                    {uploadedImage
                                        ? "Custom Avatar"
                                        : selectedAvatar?.name ?? "Current avatar"}
                                </p>
                                <p className="mt-1 text-sm text-slate-400">This will be shown throughout your profile and rooms.</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-950/70 p-5 text-center transition hover:border-cyan-400 hover:bg-slate-800/70">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        if (!file) {
                                            return;
                                        }

                                        const reader = new FileReader();

                                        reader.onload = () => {
                                            const imageUrl = reader.result as string;

                                            setCropImage(imageUrl);
                                        };

                                        reader.readAsDataURL(file);
                                    }}
                                />
                                <ImagePlus className="h-8 w-8 text-cyan-300" />
                                <span className="mt-3 text-sm font-semibold text-white">Upload custom</span>
                                <span className="mt-1 text-xs text-slate-400">PNG, JPG, or GIF</span>
                            </label>

                            {uploadedAvatars.map((image, index) => {
                                const isSelected = image === uploadedImage;

                                return (
                                    <div
                                        key={`${image}-${index}`}
                                        className={`group relative rounded-2xl border p-4 transition ${
                                            isSelected
                                                ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/10"
                                                : "border-slate-700 bg-slate-950/70 hover:border-slate-500 hover:bg-slate-800/70"
                                        }`}
                                    >
                                        <button
                                            onClick={() => setUploadedImage(image)}
                                            className="w-full text-left"
                                        >
                                            <div className="relative flex items-center justify-center">
                                                <img
                                                    src={image}
                                                    alt={`Uploaded avatar ${index + 1}`}
                                                    className="h-20 w-20 rounded-full object-cover"
                                                />

                                                {isSelected && (
                                                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-950/40">
                                                        <Check className="h-7 w-7 text-cyan-300" />
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <p className="font-semibold text-white">Custom Avatar</p>
                                                <p className="mt-1 text-sm text-slate-400">Uploaded image</p>
                                            </div>
                                        </button>

                                        {!isSelected && (
                                            <button
                                                onClick={() => handleDelete(image)}
                                                className="absolute right-3 top-3 rounded-full border border-rose-400/30 bg-slate-950/90 p-2 text-rose-300 opacity-0 transition group-hover:opacity-100 hover:border-rose-400 hover:bg-rose-400/10 hover:text-rose-200"
                                                title="Delete avatar"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}

                            {avatars.map((avatar) => {
                                const isSelected = avatar.id === avatarId && !uploadedImage;

                                return (
                                    <button
                                        key={avatar.id}
                                        onClick={() => {
                                            setAvatarId(avatar.id);
                                            setUploadedImage(null);
                                        }}
                                        className={`rounded-2xl border p-4 text-left transition ${
                                            isSelected
                                                ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/10"
                                                : "border-slate-700 bg-slate-950/70 hover:border-slate-500 hover:bg-slate-800/70"
                                        }`}
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <img
                                                src={avatar.image}
                                                alt={avatar.name}
                                                className="h-20 w-20 rounded-full object-cover"
                                            />
                                            {isSelected && (
                                                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-950/40">
                                                    <Check className="h-7 w-7 text-cyan-300" />
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <p className="font-semibold text-white">{avatar.name}</p>
                                            <p className="mt-1 text-sm text-slate-400">Preset style</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex flex-wrap justify-end gap-3">
                            <button
                                onClick={() => (onClose ? onClose() : navigate("/profile"))}
                                className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {cropImage && (
                <AvatarCropper
                    image={cropImage}
                    onCancel={() => setCropImage(null)}
                    onSave={(croppedImage) => {
                        setUploadedImage(croppedImage);

                        setUploadedAvatars((previous) => {
                            if (previous.includes(croppedImage)) {
                                return previous;
                            }

                            return [...previous, croppedImage];
                        });

                        setCropImage(null);
                    }}
                />
            )}

        </section>
    );
}

export default AvatarSelector