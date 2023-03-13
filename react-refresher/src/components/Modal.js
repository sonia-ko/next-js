function Modal({ onCancel, onConfirm }) {
  return (
    <div className="modal">
      <p>Are you sure?</p>
      <button onClick={onCancel} className="btn btn--alt">
        Cancel
      </button>
      <button onClick={onConfirm} className="btn">
        Confirm
      </button>
    </div>
  );
}

export default Modal;
