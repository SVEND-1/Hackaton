import type { MessageItemProps } from "../../types/chat.types";

export default function MessageItem({ message, openAgentCard }: MessageItemProps) {
    return (
        <div className={`message ${message.type === "user" ? "right" : "left"}`}>
            {message.type === "agent" && (
                <div
                    className="message-avatar"
                    onClick={() => message.agentId && openAgentCard(message.agentId)}
                />
            )}

            <div className={`message-content ${message.type === "user" ? "user-message" : ""}`}>
                <div className="message-header">
                    <span className="message-author">{message.author}</span>
                    <span className="message-time">{message.time}</span>
                </div>
                <div className="message-text">{message.text}</div>
            </div>
        </div>
    );
}