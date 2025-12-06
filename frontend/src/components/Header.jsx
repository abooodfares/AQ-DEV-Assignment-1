export default function Header({ connectionStatus }) {
    return (
        <header className="top-bar">
            <div className="logo-section">
                <h2>AQAR<span className="dot">.</span>LIVE</h2>
            </div>
            <div className={`connection-badge ${connectionStatus === 'Connected' ? 'online' : 'offline'}`}>
                <span className="indicator"></span>
                {connectionStatus}
            </div>
        </header>
    );
}
