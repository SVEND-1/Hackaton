import DashboardHeader from "./DashboardHeader";
import StatsGrid from "./StatsGrid";
import EventsFeed from "./EventsFeed";
import AgentsSection from "./AgentsSection";

export default function MainContent() {
    return (
        <div className="main-content">
            <div className="dashboard-page">
                <DashboardHeader />
                <StatsGrid />
                <EventsFeed />
                <AgentsSection />
            </div>
        </div>
    );
}