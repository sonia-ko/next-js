import { useState } from "react";

import Modal from "./Modal";
import Backdrop from "./Backdrop";

const Todo = ({ text }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="card">
      <h2>{text}</h2>
      <div className="actions">
        <button onClick={deleteHandler} className="btn">
          Delete
        </button>
      </div>
      {modalIsOpen && <Modal onConfirm={closeModal} onCancel={closeModal} />}
      {modalIsOpen && <Backdrop onClick={closeModal} />}
    </div>
  );
};

export default Todo;
