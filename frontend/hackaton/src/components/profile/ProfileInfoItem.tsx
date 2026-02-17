import type { ProfileInfoItemProps } from "../../types/profile.types";

export default function ProfileInfoItem({ label, value }: ProfileInfoItemProps) {
    return (
        <div className="profile-info-item">
            <span className="profile-info-label">{label}</span>
            <span className="profile-info-value">{value}</span>
        </div>
    );
}