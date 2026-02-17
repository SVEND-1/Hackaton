import { Link, useLocation } from "react-router-dom";
import Logo from "../Dashboard/Logo";
import ProfileSection from "../Dashboard/ProfileSection";
import ChatIcon from "../icons/ChatIcon";
import DashboardIcon from "../icons/DashboardIcon";

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="sidebar">
            <Logo />
            <div className="nav-buttons">
                <Link
                    to="/chat"
                    className={`nav-btn ${location.pathname === "/chat" ? "active" : ""}`}
                >
                    <ChatIcon />
                    <span>чат</span>
                </Link>

                <Link
                    to="/dashboard"
                    className={`nav-btn ${location.pathname === "/dashboard" ? "active" : ""}`}
                >
                    <DashboardIcon />
                    <span>дашборд</span>
                </Link>
            </div>
            <ProfileSection />
        </div>
    );
}