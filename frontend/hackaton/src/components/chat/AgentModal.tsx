import PersonalityList from "./PersonalityList";
import type { AgentModalProps } from "../../types/chat.types";

export default function AgentModal({
                                       agent,
                                       showPersonalityList,
                                       setShowPersonalityList,
                                       changePersonality,
                                       closeModal
                                   }: AgentModalProps) {
    return (
        <div className="agent-modal show" onClick={closeModal}>
            <div
                className="agent-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="agent-modal-header">
                    <h2>{agent.name}</h2>
                    <button className="close-modal" onClick={closeModal}>
                        ×
                    </button>
                </div>

                <div className="agent-modal-body">
                    <div className="agent-section">
                        <div className="section-header">
                            <h3>Характер</h3>
                            <button
                                className="change-btn"
                                onClick={() => setShowPersonalityList(!showPersonalityList)}
                            >
                                Сменить
                            </button>
                        </div>

                        <p>{agent.personality}</p>

                        {showPersonalityList && (
                            <PersonalityList changePersonality={changePersonality} />
                        )}
                    </div>

                    <div className="agent-section">
                        <h3>Ключевые воспоминания</h3>
                        <p>{agent.memories}</p>
                    </div>

                    <div className="agent-section">
                        <h3>Текущие планы</h3>
                        <p>{agent.plans}</p>
                    </div>

                    <div className="agent-section">
                        <h3>Отношения</h3>
                        <div className="relationship-status">
                            <span className="relationship-label">
                                Симпатия/Антипатия:
                            </span>
                            <span
                                className={`relationship-value ${
                                    agent.relationship === "симпатия"
                                        ? "sympathy"
                                        : agent.relationship === "антипатия"
                                            ? "antipathy"
                                            : "neutral"
                                }`}
                            >
                                {agent.relationship}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}