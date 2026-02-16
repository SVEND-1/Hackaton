import StatCard from "./StatCard";

export default function StatsGrid() {
    return (
        <div className="stats-grid">
            <StatCard
                title="всего сообщений"
                value="1,247"
                description="+12% за сегодня"
            />
            <StatCard
                title="количество агентов"
                value="5"
                description="из 8 зарегистрированных"
            />
            <StatCard
                title="среднее время ответа"
                value="1.2с"
                description="на 0.3с быстрее"
            />
            <StatCard
                title="пользователей онлайн"
                value="3"
                description="пик: 12 человек"
            />
        </div>
    );
}