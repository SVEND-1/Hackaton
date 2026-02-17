import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";
import type { ChatMainContentProps } from "../../types/chat.types";

export default function ChatMainContent({
                                            messages,
                                            input,
                                            setInput,
                                            handleSend,
                                            openAgentCard
                                        }: ChatMainContentProps) {
    return (
        <div className="main-content">
            <div className="chat-page">
                <ChatHeader />
                <MessagesList
                    messages={messages}
                    openAgentCard={openAgentCard}
                />
                <ChatInput
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                />
            </div>
        </div>
    );
}