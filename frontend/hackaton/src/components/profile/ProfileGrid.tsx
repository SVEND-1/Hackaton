import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import type { ProfileGridProps } from "../../types/profile.types";

export default function ProfileGrid({ user }: ProfileGridProps) {
    return (
        <div className="profile-grid">
            <ProfileLeft user={user} />
            <ProfileRight user={user} />
        </div>
    );
}