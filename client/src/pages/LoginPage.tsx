import MainLayout from "../layouts/MainLayout";


import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";
import { setCurrentUser } from "../users/currentUser";

function LoginPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = await login(username, password);

        if (!result.result.success || !result.user) {
            setError(result.result.message);
            return;
        }

        setCurrentUser(result.user);
        navigate("/dashboard");
    }

    return (
        <MainLayout>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-slate-900/70 border border-slate-700 rounded-2xl shadow-xl p-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white">
                                Welcome Back
                            </h1>

                            <p className="mt-2 text-slate-400">
                                Log in to your VidKeys account.
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-slate-300 text-left"
                                    >
                                        Username
                                    </label>

                                    <input
                                        id="username"
                                        type="text"
                                        required
                                        placeholder="Enter your username"
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
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-slate-300"
                                        >
                                            Password
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
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Enter your password"
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
                                            placeholder:text-slate-500
                                            outline-none
                                            transition
                                            focus:border-cyan-400
                                            focus:ring-1
                                            focus:ring-cyan-400
                                        "
                                    />
                                </div>

                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => console.log("Forgot username/password clicked.")}
                                        className="
                                            text-sm
                                            text-cyan-400
                                            hover:text-cyan-300
                                            transition-colors
                                        "
                                    >
                                        Forgot username or password?
                                    </button>
                                </div>
            
                                {error && (
                                    <p className="text-sm text-red-400">
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
                                    Login
                                </button>
                            </form>

                            <div className="mt-6 border-t border-slate-700 pt-6">
                                <p className="text-sm text-slate-400">
                                    Don't have an account?
                                </p>

                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="
                                        mt-2
                                        text-sm
                                        font-semibold
                                        text-cyan-400
                                        hover:text-cyan-300
                                        transition-colors
                                    "
                                >
                                    Sign up now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default LoginPage;
