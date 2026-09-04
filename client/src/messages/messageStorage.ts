const MESSAGE_STORAGE_KEY = "vidkeys-messages";

export function loadMessages() {
    const data = localStorage.getItem(MESSAGE_STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

export function saveMessages(messages: unknown[]) {
    localStorage.setItem(
        MESSAGE_STORAGE_KEY,
        JSON.stringify(messages)
    );
}