import { useState } from "react";
import PropTypes from "prop-types";
import "./editMessageModal.css";

const EditMessageModal = ({ isOpen, onClose, onSubmit, initialMessage }) => {
  console.log("EditMessageModal rendered, isOpen:", isOpen);
  const [message, setMessage] = useState(initialMessage);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(message);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`modal ${isOpen ? "show-modal" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <textarea
            id="message"
            name="message"
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="save-button">
              Save Message
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditMessageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialMessage: PropTypes.string,
};

export default EditMessageModal;
