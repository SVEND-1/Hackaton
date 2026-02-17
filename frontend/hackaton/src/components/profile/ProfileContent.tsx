import ProfileHeader from "./ProfileHeader";
import ProfileGrid from "./ProfileGrid";
import type { ProfileContentProps } from "../../types/profile.types";

export default function ProfileContent({ user }: ProfileContentProps) {
    return (
        <div className="main-content">
            <div className="profile-page">
                <ProfileHeader />
                <ProfileGrid user={user} />
            </div>
        </div>
    );
}