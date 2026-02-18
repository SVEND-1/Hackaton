import type { StatCardProps } from "../../types/dashboard.types";

export default function StatCard({ title, value, description }: StatCardProps) {
    return (
        <div className="stat-card">
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-desc">{description}</div>
        </div>
    );
}