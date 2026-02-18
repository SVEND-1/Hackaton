import type { AgentItemProps } from "../../types/dashboard.types";

export default function AgentItem({ name, avatar, messages, mood, moodClass }: AgentItemProps) {
    return (
        <div className="agent-item">
            <div className="agent-info">
                <div className="agent-avatar">{avatar}</div>
                <span className="agent-name">{name}</span>
            </div>
            <div className="agent-stats">
                <span className="agent-messages">{messages}</span>
                <span className={`agent-mood ${moodClass}`}>
                    {mood}
                </span>
            </div>
        </div>
    );
}