import './ConfirmDialog.css'

function ConfirmDialog({ title, message, onConfirm, onCancel, isConfirming }) {
  return (
    <div className="modal-overlay">
      <div className="confirm-dialog card">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirm-dialog-actions">
          <button onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isConfirming} className="btn btn-danger">
            {isConfirming ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog