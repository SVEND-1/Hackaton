import type { ProfileHeaderProps } from "../../types/profile.types";

export default function ProfileHeader({
                                          title = "Профиль",
                                          subtitle = "личная информация и статистика"
                                      }: ProfileHeaderProps) {
    return (
        <div className="profile-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
}