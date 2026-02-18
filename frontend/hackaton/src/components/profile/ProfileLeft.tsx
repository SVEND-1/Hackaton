import ProfileInfoSection from "./ProfileInfoSection";
import type { ProfileLeftProps } from "../../types/profile.types";

export default function ProfileLeft({ user }: ProfileLeftProps) {
    return (
        <div className="profile-left">
            <div className="profile-name">{user.fullName}</div>
            <div className="profile-role">{user.role}</div>
            <ProfileInfoSection user={user} />
        </div>
    );
}