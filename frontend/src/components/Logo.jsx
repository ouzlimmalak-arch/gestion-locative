function Logo({ compact = false }) {
  return (
    <div className={`app-logo ${compact ? "app-logo-compact" : ""}`}>
      <span className="app-logo-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="M6 22.5 24 7l18 15.5M11 20v21h26V20M20 41V28h8v13M33 13V8h5v9" />
        </svg>
      </span>
      <span className="app-logo-text">
        <strong>Gestion locative</strong>
        {!compact && <small>Votre espace immobilier</small>}
      </span>
    </div>
  );
}
export default Logo;