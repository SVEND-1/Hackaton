import { Link } from "react-router-dom";
import ProfileAvatar from "../Dashboard/ProfileAvatar";
import type { ProfileSectionProps } from "../../types/profile.types";

export default function ProfileSection({ onLogout }: ProfileSectionProps) {
    if (onLogout) {
        return (
            <div className="profile-section">
                <button onClick={onLogout} className="profile-btn">
                    <span>выйти</span>
                </button>
            </div>
        );
    }

    return (
        <div className="profile-section">
            <Link to="/profile" className="profile-btn active">
                <ProfileAvatar />
                <span>профиль</span>
            </Link>
        </div>
    );
}