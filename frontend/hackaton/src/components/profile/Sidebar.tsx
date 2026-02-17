import {  useLocation } from "react-router-dom";
import Logo from "../Dashboard/Logo";
import NavButtons from "../Dashboard/NavButtons";
import ProfileSection from "./ProfileSection";
import type { SidebarProps } from "../../types/profile.types";

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