import type { Message } from "./message";
import { loadMessages, saveMessages } from "./messageStorage";

let messages: Message[] = loadMessages();

export function getMessagesBetweenUsers(
    userId1: string,
    userId2: string
): Message[] {
    return messages.filter(
        (message) => 
            (message.senderId === userId1 &&
                message.receiverId === userId2) ||
            (message.senderId === userId2 &&
                message.receiverId === userId1)
    );
}

export function sendMessage(
    senderId: string,
    receiverId: string,
    content: string
): Message {
    const message: Message = {
        id: crypto.randomUUID(),
        senderId,
        receiverId,
        content,
        createdAt: Date.now(),
    };

    messages.push(message);
    saveMessages(messages);

    return message;
}