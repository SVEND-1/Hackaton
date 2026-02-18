import {  useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavButtons from "./NavButtons";
import ProfileSection from "./ProfileSection";
import type { SidebarProps } from "../../types/dashboard.types";

export default function Sidebar({ onLogout, activePath }: SidebarProps) {
    const location = useLocation();
    const currentPath = activePath || location.pathname;

    return (
        <div className="sidebar">
            <Logo />
            <NavButtons activePath={currentPath} />
            <ProfileSection onLogout={onLogout} />
        </div>
    );
}