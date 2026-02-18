export interface Agent {
    name: string;
    avatar: string;
    messages: number;
    mood: string;
    moodClass: string;
}

export interface Stat {
    title: string;
    value: string;
    description: string;
}

export interface AgentItemProps {
    name: string;
    avatar: string;
    messages: number;
    mood: string;
    moodClass: string;
}

export interface NavButtonsProps {
    activePath: string;
}

export interface SidebarProps {
    onLogout?: () => void;
    activePath?: string;
}

export interface ProfileSectionProps {
    onLogout?: () => void;
}

export interface StatCardProps {
    title: string;
    value: string;
    description: string;
}

export interface StatsGridProps {
    stats?: Stat[];
}

export interface AgentsListProps {
    agents?: Agent[];
}

export interface AgentsSectionProps {
    title?: string;
}

export interface EventsFeedProps {
    title?: string;
    count?: number;
    emptyMessage?: string;
    emptyDescription?: string;
}

export interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
}

export interface MainContentProps {
    children?: React.ReactNode;
}

export interface LogoProps {
    text?: string;
}

export interface DashboardStatsResponse {
    success: boolean;
    data: {
        totalMessages: number;
        totalAgents: number;
        averageResponseTime: number;
        onlineUsers: number;
        messagesTrend: string;
        agentsTotal: number;
        responseTimeTrend: string;
        onlinePeak: number;
    };
}

export interface AgentsResponse {
    success: boolean;
    data: Agent[];
}

export interface EventsResponse {
    success: boolean;
    data: {
        id: number;
        type: string;
        message: string;
        time: string;
    }[];
}