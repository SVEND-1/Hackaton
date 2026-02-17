import AgentsList from "./AgentsList";

export default function AgentsSection() {
    return (
        <div className="agents-section">
            <div className="agents-header">
                <h3>Нейросети</h3>
                <div className="agents-header-stats">
                    <span>Сообщения</span>
                    <span>Настроение</span>
                </div>
            </div>
            <AgentsList />
        </div>
    );
}