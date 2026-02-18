import StatItem from "./StatItem";
import type { StatsGridProps } from "../../types/profile.types";

export default function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="stats-grid">
            <StatItem number={stats.messages} label="сообщений" />
            <StatItem number={stats.chats} label="чатов" />
            <StatItem number={stats.days} label="дней" />
            <StatItem number={stats.rating} label="рейтинг" />
        </div>
    );
}