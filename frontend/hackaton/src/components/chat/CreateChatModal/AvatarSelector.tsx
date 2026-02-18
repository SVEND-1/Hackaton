interface AvatarSelectorProps {
    selected: string;
    avatars: string[];
    onSelect: (avatar: string) => void;
}

export default function AvatarSelector({
                                           selected,
                                           avatars,
                                           onSelect
                                       }: AvatarSelectorProps) {
    return (
        <div className="avatar-selector">
            {avatars.map((ava) => (
                <div
                    key={ava}
                    className={`avatar-option ${selected === ava ? "selected" : ""}`}
                    onClick={() => onSelect(ava)}
                >
                    <img src={ava} alt="avatar" />
                </div>
            ))}
        </div>
    );
}
