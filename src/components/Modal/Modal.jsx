import React, { useEffect, useState } from "react";
import "./Modal.css";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { updateEvent } from "../../store/Events/Event.action";

function Modal({
  showModal,
  setShowModal,
  handleSave,
  handleUpdate,
  formDataProps,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    description: "",
    startDate: "",
    time: "",
    labels: "",
    objective: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    const { show, time } = showModal;

    if (show && time) {
      setFormData({ ...formData, time: time });
    }
  }, [showModal]);

  useEffect(() => {
    if (!isEmpty(formDataProps)) {
      setFormData({ ...formDataProps });
      setIsUpdate(true);
    }
  }, [formDataProps]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      handleUpdate(formDataProps.time);
      dispatch(updateEvent(formData, formDataProps.time));
    } else {
      handleSave(formData);
    }
  };

  if (!showModal.show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={() => setShowModal(!showModal)}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>
          <label>
            Labels:
            <input
              type="text"
              name="labels"
              value={formData.labels}
              onChange={handleChange}
            />
          </label>
          <label>
            Objective:
            <input
              type="text"
              name="objective"
              value={formData.objective}
              onChange={handleChange}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">{isUpdate ? "Update" : "Create"}</button>
            <button type="button" onClick={() => setShowModal(!showModal)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
