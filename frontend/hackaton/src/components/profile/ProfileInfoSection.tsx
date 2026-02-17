import ProfileInfoItem from "./ProfileInfoItem";
import type { ProfileInfoSectionProps } from "../../types/profile.types";

export default function ProfileInfoSection({ user }: ProfileInfoSectionProps) {
    return (
        <div className="profile-info-section">
            <ProfileInfoItem
                label="Имя пользователя"
                value={user.username}
            />
            <ProfileInfoItem
                label="Email"
                value={user.email}
            />
        </div>
    );
}