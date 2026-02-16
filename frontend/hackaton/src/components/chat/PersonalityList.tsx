import type { PersonalityListProps } from "../../types/chat.types";

export default function PersonalityList({ changePersonality }: PersonalityListProps) {
    return (
        <div className="personality-list show">
            <div
                className="personality-item"
                onClick={() =>
                    changePersonality(
                        "Энергичный, креативный, любит генерировать идеи."
                    )
                }
            >
                Энергичный, креативный
            </div>
            <div
                className="personality-item"
                onClick={() =>
                    changePersonality(
                        "Спокойный, рассудительный, взвешивает решения."
                    )
                }
            >
                Спокойный, рассудительный
            </div>
        </div>
    );
}