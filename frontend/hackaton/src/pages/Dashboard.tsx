import Sidebar from "../components/Dashboard/Sidebar";
import MainContent from "../components/Dashboard/MainContent";
import "../styles/dashboard.css";

export default function Dashboard() {
    return (
        <div className="app">
            <Sidebar />
            <MainContent />
        </div>
    );
}