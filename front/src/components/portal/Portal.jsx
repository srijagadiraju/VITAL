import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./portal.css";
import SearchBar from "../searchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Portal = ({ appointments }) => {
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/appointments");
                const data = await response.json();
                const formattedAppointments = data.map(appointment => ({
                    name: appointment["Doctor's Name"],
                    department: appointment.Department,
                    visit: appointment.Visit,
                    time: appointment["Time of Appointment"]
                }));
                setAppointmentsData(formattedAppointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        }
        fetchData();
    }, []);

    const filteredAppointments = appointmentsData.filter(appointment => {
        const lowerCaseQuery = query.toLowerCase();
        return (
            appointment.name.toLowerCase().includes(lowerCaseQuery) ||
            appointment.department.toLowerCase().includes(lowerCaseQuery) ||
            appointment.visit.toLowerCase().includes(lowerCaseQuery) ||
            appointment.time.toLowerCase().includes(lowerCaseQuery)
        );
    });

    const handleSelect = () => {
        navigate('/apt-confirmation/1');
    };

    return (
        <div className="container">
            <h1>Welcome to the Appointment Portal!</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <div className="row">
                {filteredAppointments.map((appointment, index) => (
                    <div key={index} className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Name: {appointment.name}</h5>
                                <p className="card-text"><strong>Department:</strong> {appointment.department}</p>
                                <p className="card-text"><strong>Visit:</strong> {appointment.visit}</p>
                                <p className="card-text"><strong>Time:</strong> {appointment.time}</p>
                                <button onClick={handleSelect}>Select This Appointment</button>
                            </div>
                        </div>
                    </div>
                ))}
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
            time: PropTypes.string.isRequired
        })
    )
};

export default Portal;
