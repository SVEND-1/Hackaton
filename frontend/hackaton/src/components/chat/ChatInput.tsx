import type { ChatInputProps } from "../../types/chat.types";

export default function ChatInput({ input, setInput, handleSend }: ChatInputProps) {
    return (
        <div className="input-container">
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Написать сообщение..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="send-btn" onClick={handleSend}>
                    Отправить
                </button>
            </div>
        </div>
    );
}