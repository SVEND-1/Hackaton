export default function EventsFeed() {
    return (
        <div className="events-feed">
            <div className="events-header">
                <h3>Лента событий</h3>
                <span className="events-count">0 новых</span>
            </div>
            <div className="events-empty">
                <p>Событий пока нет</p>
                <span>Когда появятся новые действия — они отобразятся здесь</span>
            </div>
        </div>
    );
}