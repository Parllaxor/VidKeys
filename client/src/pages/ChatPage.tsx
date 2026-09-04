import { useEffect, useState, type KeyboardEvent } from "react";
import { useParams } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import { getCurrentUser } from "../users/currentUser";
import { getUserById } from "../users/userDatabase";
import {
    getMessagesBetweenUsers,
    sendMessage,
} from "../messages/messageDatabase";

import type { Message } from "../messages/message";

function ChatPage() {
    const { friendId } = useParams<{ friendId: string }>();

    const currentUser = getCurrentUser();
    const friend = friendId ? getUserById(friendId) : undefined;

    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!currentUser || !friendId) {
            setMessages([]);
            return;
        }

        const updateMessages = () => {
            setMessages(
                getMessagesBetweenUsers(currentUser.id, friendId)
            );
        };

        updateMessages();

        const interval = setInterval(updateMessages, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [friendId, currentUser?.id]);

    if (!currentUser || !friend) {
        return (
            <AppLayout>
                <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-950/60 p-8 text-center">
                    <h1 className="text-xl font-bold text-white">
                        Chat not found
                    </h1>

                    <p className="mt-2 text-slate-400">
                        This user could not be found.
                    </p>
                </div>
            </AppLayout>
        );
    }

    const handleSendMessage = () => {
        const content = messageText.trim();

        if (!content) {
            return;
        }

        const newMessage = sendMessage(
            currentUser.id,
            friend.id,
            content
        );

        setMessages((currentMessages) => [
            ...currentMessages,
            newMessage,
        ]);

        setMessageText("");
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <AppLayout>
            <div className="mt-8 flex h-[calc(100vh-10rem)] min-h-[500px] flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/60">

                {/* Chat Header */}
                <div className="border-b border-slate-700 bg-[#111827] px-5 py-4">
                    <h1 className="font-bold text-white">
                        {friend.displayName}
                    </h1>

                    <p className="text-sm text-slate-400">
                        @{friend.username}
                    </p>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto p-6">
                    {messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <p className="font-medium text-slate-400">
                                    No messages yet.
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Send a message to start the conversation.
                                </p>
                            </div>
                        </div>
                    ) : (
                        messages.map((message) => {
                            const isMine =
                                message.senderId === currentUser.id;

                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        isMine
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`
                                            max-w-[70%]
                                            rounded-2xl
                                            px-4
                                            py-2.5
                                            ${
                                                isMine
                                                    ? "bg-cyan-400 text-black"
                                                    : "bg-slate-800 text-white"
                                            }
                                        `}
                                    >
                                        <p className="break-words">
                                            {message.content}
                                        </p>

                                        <p
                                            className={`
                                                mt-1 text-xs
                                                ${
                                                    isMine
                                                        ? "text-black/60"
                                                        : "text-slate-500"
                                                }
                                            `}
                                        >
                                            {new Date(
                                                message.createdAt
                                            ).toLocaleTimeString([], {
                                                hour: "numeric",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Message Input */}
                <div className="border-t border-slate-700 bg-[#111827] p-4">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={messageText}
                            onChange={(event) =>
                                setMessageText(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder={`Message ${friend.displayName}...`}
                            className="
                                min-w-0
                                flex-1
                                rounded-xl
                                border
                                border-slate-700
                                bg-slate-900
                                px-4
                                py-3
                                text-white
                                outline-none
                                placeholder:text-slate-500
                                focus:border-cyan-400
                            "
                        />

                        <button
                            type="button"
                            onClick={handleSendMessage}
                            disabled={!messageText.trim()}
                            className="
                                rounded-xl
                                bg-cyan-400
                                px-5
                                py-3
                                font-semibold
                                text-black
                                transition
                                hover:bg-cyan-300
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            Send
                        </button>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}

export default ChatPage;