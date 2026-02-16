import MessageItem from "./MessageItem";
import type { MessagesListProps } from "../../types/chat.types";

export default function MessagesList({ messages, openAgentCard }: MessagesListProps) {
    return (
        <div className="messages-wrapper">
            {messages.map((msg) => (
                <MessageItem
                    key={msg.id}
                    message={msg}
                    openAgentCard={openAgentCard}
                />
            ))}
        </div>
    );
}