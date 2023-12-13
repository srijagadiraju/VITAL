import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./portal.css";
import { SearchBar } from "../../components";
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(21);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();
        const formattedAppointments = data.slice(0, 100).map((appointment) => ({
          name: appointment["Doctor's Name"],
          department: appointment.Department,
          visit: appointment.Visit,
          time: appointment["Time of Appointment"],
        }));
        setAppointmentsData(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    fetchData();
  }, []);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = (currentPage - 1) * appointmentsPerPage;
  const allFilteredAppointments = appointmentsData.filter((appointment) => {
    const lowerCaseQuery = query.toLowerCase();
    return (
      appointment.name.toLowerCase().includes(lowerCaseQuery) ||
      appointment.department.toLowerCase().includes(lowerCaseQuery) ||
      appointment.visit.toLowerCase().includes(lowerCaseQuery) ||
      appointment.time.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const currentAppointments = query
    ? allFilteredAppointments
    : allFilteredAppointments.slice(
        indexOfFirstAppointment,
        indexOfLastAppointment,
      );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelect = async (appointment) => {
    console.log("Appointment data:", appointment);
    navigate(`/apt-selection/`, { state: { appointment: appointment } });
  };

  return (
    <div className="container">
      <h1>Welcome to the Appointment Portal!</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="row">
        {currentAppointments.map((appointment, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                {/* Adjusted heading level to h3 for the doctor's name */}
                <p className="card-title">Name: {appointment.name}</p>
                <p className="card-text">
                  <strong>Department:</strong> {appointment.department}
                </p>
                <p className="card-text">
                  <strong>Visit:</strong> {appointment.visit}
                </p>
                <p className="card-text">
                  <strong>Time:</strong> {appointment.time}
                </p>
                <label htmlFor={`selectAppointmentBtn${index}`}>
                  Select This Appointment
                </label>
                <button
                  id={`selectAppointmentBtn${index}`}
                  className="select-appointment"
                  onClick={() => handleSelect(appointment)}
                >
                  Select This Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {allFilteredAppointments.length > appointmentsPerPage && (
          <ul className="pagination">
            {Array(
              Math.ceil(allFilteredAppointments.length / appointmentsPerPage),
            )
              .fill()
              .map((_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Portal.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      visit: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }),
  ),
};

export default Portal;
