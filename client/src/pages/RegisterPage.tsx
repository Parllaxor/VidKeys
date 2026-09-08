import MainLayout from "../layouts/MainLayout";

import { useState, type FormEvent } from "react";
import { Calendar } from "lucide-react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../users/currentUser";

function RegisterPage() {

    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");
        
        if (password !== passwordConfirm) {
            setError("Passwords do not match.");
            return;
        }

        const registration = await register(
            username,
            displayName,
            birthday,
            password
        );
        
        if (!registration.result.success) {
            setError(registration.result.message);
            return;
        }
        
        if (registration.user) {
            setCurrentUser(registration.user);
            navigate("/dashboard");
        }
    }

    return (
        <MainLayout>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-slate-900/70 border border-slate-700 rounded-2xl shadow-xl p-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white">
                                Create Your Account
                            </h1>

                            <p className="mt-2 text-slate-400">
                                Join VidKeys and start building your space.
                            </p>

                            <p className="mt-4 text-xs text-slate-300">
                                Required fields indicated with *
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-slate-300"
                                    >
                                        *Username
                                    </label>

                                    <input 
                                        id="username"
                                        type="text"
                                        required
                                        placeholder="Choose a username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="
                                            mt-2
                                            w-full
                                            rounded-lg
                                            border
                                            border-slate-700
                                            bg-slate-950
                                            px-4
                                            py-3
                                            text-white
                                            placeholder:text-slate-500
                                            outline-none
                                            transition
                                            focus:border-cyan-400
                                            focus:ring-1
                                            focus:ring-cyan-400
                                        "
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="displayName"
                                        className="block text-sm font-medium text-slate-300"
                                    >
                                        *Display Name
                                    </label>

                                    <input 
                                        id="displayName"
                                        type="text"
                                        required
                                        placeholder="Choose your preferred display name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="
                                            mt-2
                                            w-full
                                            rounded-lg
                                            border
                                            border-slate-700
                                            bg-slate-950
                                            px-4
                                            py-3
                                            text-white
                                            placeholder:text-slate-500
                                            outline-none
                                            transition
                                            focus:border-cyan-400
                                            focus:ring-1
                                            focus:ring-cyan-400
                                        "
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <label
                                            htmlFor="birthday"
                                            className="block text-sm font-medium text-slate-300"
                                        >
                                            *Birthday
                                        </label>

                                        <Calendar className="w-4 h-4 text-cyan-400" />
                                    </div>

                                    <input 
                                        id="birthday"
                                        type="date"
                                        required
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        className="
                                            mt-2
                                            w-full
                                            rounded-lg
                                            border
                                            border-slate-700
                                            bg-slate-950
                                            px-4
                                            py-3
                                            text-white
                                            outline-none
                                            transition
                                            focus:border-cyan-400
                                            focus:ring-1
                                            focus:ring-cyan-400
                                        "
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-slate-300"
                                        >
                                            *Password
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>

                                    <input 
                                        id="password"
                                        type={showPassword? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="
                                            mt-2
                                            w-full
                                            rounded-lg
                                            border
                                            border-slate-700
                                            bg-slate-950
                                            px-4
                                            py-3
                                            text-white
                                            outline-none
                                            transition
                                            focus:border-cyan-400
                                            focus:ring-1
                                            focus:ring-cyan-400
                                        "
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="passwordConfirm"
                                            className="block text-sm font-medium text-slate-300"
                                        >
                                            *Confirm Password
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            {showPasswordConfirm ? "Hide" : "Show"}
                                        </button>
                                    </div>

                                    <input 
                                        id="passwordConfirm"
                                        type={showPasswordConfirm ? "text" : "password"}
                                        required
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        className="
                                            mt-2
                                            w-full
                                            rounded-lg
                                            border
                                            border-slate-700
                                            bg-slate-950
                                            px-4
                                            py-3
                                            text-white
                                            outline-none
                                            transition
                                            focus:border-cyan-400
                                            focus:ring-1
                                            focus:ring-cyan-400
                                        "
                                    />
                                </div>

                                {error && (
                                    <p className="text-sm text-red-400 text-center">
                                           {error}
                                    </p>
                                )}
            
                                <button
                                    type="submit"
                                    className="
                                        w-full
                                        rounded-lg
                                        bg-cyan-500
                                        px-4
                                        py-3
                                        font-semibold
                                        text-slate-950
                                        transition-colors
                                        hover:bg-cyan-400
                                    "
                                >
                                    Create Account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default RegisterPage;
