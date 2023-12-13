import { useState, useEffect, useRef } from "react";
import Confirmed from "../containers/confirmed/Confirmed";
import { LoginNav, CTA, EditMessageModal } from "../components";
import { useParams } from "react-router-dom";

const AptConfirmation = () => {
  const [appointment, setAppointment] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { aptId } = useParams();
  const editButtonRef = useRef(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/apt/get-apt/${aptId}`);
        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
        // Handle the error appropriately
      }
    };

    fetchAppointment();
  }, [aptId]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  const handleUpdateAppointment = async () => {
    const response = await fetch(`/api/apt/delete-apt/${aptId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Redirect to portal page upon successful deletion
      alert("Update your appointment in the portal.");
      window.location.href = "/portal";
    } else {
      // Handle the error, maybe show a message to the user
      alert("Failed to delete appointment.");
    }
  };

  const handleDeleteAppointment = async () => {
    const response = await fetch(`/api/apt/delete-apt/${aptId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Redirect to portal page upon successful deletion
      alert("Your appointment has been deleted.");
      window.location.href = "/portal";
    } else {
      // Handle the error, maybe show a message to the user
      alert("Failed to delete appointment.");
    }
  };

  const handleEditButtonClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    editButtonRef.current?.focus();
  };

  return (
    <div className="App">
      <div className="gradient__bg">
        <LoginNav />
        <Confirmed appointment={appointment} />
      </div>

      <EditMessageModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal} //
        initialMessage={appointment.message}
        onSubmit={async (newMessage) => {
          const response = await fetch(`/api/apt/update-apt/${aptId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: newMessage }),
          });
          if (response.ok) {
            // Update the message in local state to reflect the change
            setAppointment({ ...appointment, message: newMessage });
          }
          setEditModalOpen(false);
        }}
      />
      <CTA
        ref={editButtonRef}
        title="Add a message!"
        text="Reach out to your doctor before your appointment for context"
        btnText="Add/Edit message"
        onClick={handleEditButtonClick}
      />
      <CTA
        title="Update appoitment!"
        text="If you want to change your appointment details, please click update"
        btnText="Update appointment"
        onClick={handleUpdateAppointment}
      />
      <CTA
        title="If you don't need your appointment anymore or you want to restart!"
        text="Cancel this appointment"
        btnText="Cancel appointment"
        onClick={handleDeleteAppointment}
      />
    </div>
  );
};

export default AptConfirmation;
