export interface UserStats {
    messages: number;
    chats: number;
    days: number;
    rating: number;
}

export interface UserProfile {
    fullName: string;
    username: string;
    email: string;
    role: string;
    stats: UserStats;
}

export interface ProfileContentProps {
    user: UserProfile;
}

export interface ProfileGridProps {
    user: UserProfile;
}

export interface ProfileHeaderProps {
    title?: string;
    subtitle?: string;
}

export interface ProfileInfoItemProps {
    label: string;
    value: string;
}

export interface ProfileInfoSectionProps {
    user: UserProfile;
}

export interface ProfileLeftProps {
    user: UserProfile;
}

export interface ProfileRightProps {
    user: UserProfile;
}

export interface ProfileSectionProps {
    onLogout?: () => void;
}

export interface SidebarProps {
    onLogout?: () => void;
    activePath?: string;
}

export interface StatItemProps {
    number: number;
    label: string;
}

export interface StatsGridProps {
    stats: UserStats;
}

export interface GetProfileResponse {
    success: boolean;
    data: UserProfile;
}

export interface UpdateProfileResponse {
    success: boolean;
    message?: string;
    data?: Partial<UserProfile>;
}

export interface UpdateProfileRequest {
    fullName?: string;
    username?: string;
    email?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangePasswordResponse {
    success: boolean;
    message?: string;
}