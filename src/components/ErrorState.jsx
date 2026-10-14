import '../style/ErrorState.css'

function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <span className="error-state-icon">⚠️</span>
      <p className="error-state-title">Something went wrong</p>
      <p className="error-state-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-outline btn-sm">
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorState