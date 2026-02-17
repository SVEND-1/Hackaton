import type{ChatHeaderProps} from "../../types/chat.types.ts"

export default function ChatHeader({ chatName }: ChatHeaderProps) {
    return (
        <div className="chat-header">
            <h1>AI Park {chatName && `- ${chatName}`}</h1>
        </div>
    );
}