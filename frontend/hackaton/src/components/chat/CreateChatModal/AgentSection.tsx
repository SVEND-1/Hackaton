import type { AgentConfig } from "../../../types/chat.types";
import AvatarSelector from "./AvatarSelector";
import { PERSONALITIES, MOODS, AVATARS } from "../../../types/modal.constants.ts";
import { useRef } from "react";

interface AgentSectionProps {
    title: string;
    agent: AgentConfig;
    neuralNetworkLabel: string;
    onChange: (field: keyof AgentConfig, value: string) => void;
    onPhotoChange?: (file: File | null) => void;
}

export default function AgentSection({
    title,
    agent,
    neuralNetworkLabel,
    onChange,
    onPhotoChange
}: AgentSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (onPhotoChange) {
            onPhotoChange(file);
        }
    };

    return (
        <div className="agent-section">
            <h3>{title}</h3>

            <div className="form-group">
                <label>ИМЯ АГЕНТА</label>
                <input
                    type="text"
                    className="form-input"
                    value={agent.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    placeholder="Введите имя"
                    required
                />
            </div>

            <div className="form-group">
                <label>МОДЕЛЬ НЕЙРОСЕТИ</label>
                <div className="network-display">
                    {neuralNetworkLabel}
                </div>
            </div>

            <div className="form-group">
                <label>ХАРАКТЕР</label>
                <select
                    className="form-select"
                    value={agent.personality}
                    onChange={(e) => onChange("personality", e.target.value)}
                    required
                >
                    <option value="">Выберите характер</option>
                    {PERSONALITIES.map((p, i) => (
                        <option key={i} value={p}>{p}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>НАСТРОЕНИЕ</label>
                <select
                    className="form-select"
                    value={agent.mood}
                    onChange={(e) => onChange("mood", e.target.value)}
                >
                    {MOODS.map((m, i) => (
                        <option key={i} value={m}>{m}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>АВАТАР</label>
                <AvatarSelector
                    selected={agent.avatar}
                    avatars={AVATARS}
                    onSelect={(ava) => onChange("avatar", ava)}
                />
            </div>

            {onPhotoChange && (
                <div className="form-group">
                    <label>ЗАГРУЗИТЬ ФОТО</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="file-input"
                    />
                </div>
            )}
        </div>
    );
}