import StatsGrid from "./StatsGrid";
import type { ProfileRightProps } from "../../types/profile.types";

export default function ProfileRight({ user }: ProfileRightProps) {
    return (
        <div className="profile-right">
            <StatsGrid stats={user.stats} />
        </div>
    );
}