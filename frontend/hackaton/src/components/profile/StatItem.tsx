import type { StatItemProps } from "../../types/profile.types";

export default function StatItem({ number, label }: StatItemProps) {
    return (
        <div className="stat-item">
            <div className="stat-number">{number}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}