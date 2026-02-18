import { Link } from "react-router-dom";
import ChatIcon from "../icons/ChatIcon";
import DashboardIcon from "../icons/DashboardIcon";
import type { NavButtonsProps } from "../../types/dashboard.types";

export default function NavButtons({ activePath }: NavButtonsProps) {
    return (
        <div className="nav-buttons">
            <Link
                to="/chat"
                className={`nav-btn ${activePath === "/chat" ? "active" : ""}`}
            >
                <ChatIcon />
                <span>чат</span>
            </Link>

            <Link
                to="/dashboard"
                className={`nav-btn ${activePath === "/dashboard" ? "active" : ""}`}
            >
                <DashboardIcon />
                <span>дашборд</span>
            </Link>
        </div>
    );
}