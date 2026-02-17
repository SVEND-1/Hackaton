import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";
import type { ChatMainContentProps } from "../../types/chat.types";

export default function ChatMainContent({
                                            messages,
                                            input,
                                            setInput,
                                            handleSend,
                                            openAgentCard,
                                            currentChat
                                        }: ChatMainContentProps) {
    if (!currentChat) {
        return (
            <div className="main-content">
                <div className="no-chat-selected">
                    <div className="no-chat-content">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                                  stroke="url(#gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 9H17" stroke="url(#gradient)" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M7 13H14" stroke="url(#gradient)" strokeWidth="1.5" strokeLinecap="round"/>
                            <defs>
                                <linearGradient id="gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#5900ff"/>
                                    <stop offset="0.5" stopColor="#8400ff"/>
                                    <stop offset="1" stopColor="#ff6600"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <h2>Добро пожаловать в AI Park!</h2>
                        <p>Создайте новый чат, чтобы начать общение с персональным AI-ассистентом</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="chat-page">
                <ChatHeader chatName={currentChat.name} />
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