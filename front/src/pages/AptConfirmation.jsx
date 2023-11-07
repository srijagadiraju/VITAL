import { useState, useEffect } from "react";
import Confirmed from "../containers/confirmed/Confirmed";
import { Navbar, CTA, EditMessageModal } from "../components";
import { useParams } from "react-router-dom";

const AptConfirmation = () => {
  const [appointment, setAppointment] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { aptId } = useParams(); // Assuming you're using React Router v6

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

  const handleDeleteAppointment = async () => {
    const response = await fetch(`/api/apt/delete-apt/${aptId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Redirect to portal page upon successful deletion
      alert("Your appointment has been deleted.");
      window.location.href = "/portal/1";
    } else {
      // Handle the error, maybe show a message to the user
      alert("Failed to delete appointment.");
    }
  };

  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Confirmed appointment={appointment} />
      </div>

      <EditMessageModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
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
        title="Add a message!"
        text="Reach out to your doctor before your appointment for context"
        btnText="Add/Edit message"
        onClick={() => {
          console.log("CTA clicked, trying to open modal");
          setEditModalOpen(true);
        }}
      />
      <CTA
        title="Cancel appoitment!"
        text="If you don't need your appointment anymore or you want to restart"
        btnText="Cancel appoitment"
        onClick={handleDeleteAppointment}
      />
    </div>
  );
};

export default AptConfirmation;
