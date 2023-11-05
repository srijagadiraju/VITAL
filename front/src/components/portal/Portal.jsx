// import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// import "./portal.css";

// const Portal = () => {
//   const [openMenu, setOpenMenu] = useState(false);

//   const [appointments, setAppointments] = useState([{ name: "", department: "", visit: "", time: "" }]);

//   useEffect(() => { // called when page is loaded for first time -- fetch appts and setState to change appts 
//     function get_data(data){
//         const temp = [];
//         data.map((e) => {
//             temp.push({"name": e["Doctor's Name"], "department": e.Department, "visit": e.Visit, "time": e["Time of Appointment"]});
//           });
//         return temp; 
//     }
    
//     async function fetch_data() {
//         const response = await fetch("/api/appointments");
//         const data = await response.json();
//         const temp = get_data(data); 
//         console.log("data fetched", data);
//         console.log("correct format", temp);
//         setAppointments(temp); // code to extract name and department 
//     }
//     fetch_data();
//   }, []);


//   function renderAppointments() {
//     return (
//       <div>
//         {appointments.map((appointment, index) => (
//           <div key={index}>
//             <p>Name: {appointment.name}</p>
//             <p>Department: {appointment.department}</p>
//             <p>Visit: {appointment.visit}</p>
//             <p>Time: {appointment.time}</p>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Welcome to the Appointment Portal!</h1>
//       {renderAppointments()};
//     </div>
//   );
// };

// export default Portal;

// Portal.propTypes = {
//     appointments: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         department: PropTypes.string.isRequired,
//         visit: PropTypes.string.isRequired,
//         time: PropTypes.string.isRequired
//       })
//     )
//   };

// import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// import "./portal.css";

// const Portal = ({ appointments }) => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [appointmentsData, setAppointmentsData] = useState([]);


//   function SearchBar(){
//     function onInput(evt){
//         console.long("search bar on input", evt.target.value);
//     }
//     return (
//     <div>
//         Search <input className="input-control" type="text" onInput={onInput} />
//     </div>
//         );
//     }

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("/api/appointments");
//         const data = await response.json();
//         const formattedAppointments = data.map(appointment => ({
//           name: appointment["Doctor's Name"],
//           department: appointment.Department,
//           visit: appointment.Visit,
//           time: appointment["Time of Appointment"]
//         }));
//         setAppointmentsData(formattedAppointments);
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to the Appointment Portal!</h1>
//       <div>
//         {appointmentsData.map((appointment, index) => (
//           <div key={index}>
//             <p>Name: {appointment.name}</p>
//             <p>Department: {appointment.department}</p>
//             <p>Visit: {appointment.visit}</p>
//             <p>Time: {appointment.time}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// Portal.propTypes = {
//   appointments: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       department: PropTypes.string.isRequired,
//       visit: PropTypes.string.isRequired,
//       time: PropTypes.string.isRequired
//     })
//   )
// };

// export default Portal;


import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import "./portal.css";

const Portal = ({ appointments }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [query, setQuery] = useState("");
  const refSearch = useRef(null); // defining reference -- when updating query, maintaining last state 

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

//   const SearchBar = () => {
//     const refSearch = useRef();

  
//     const onInputChange = evt => {
//       setQuery(evt.target.value);
//       console.log("Search bar on input", refSearch.current.value);
//     };
  
//     return (
//       <div>
//         <label className="form-label">
//         Search <input className="form-control" type="search" ref={refSearch} onChange={onInputChange} />

//         </label>
//       </div>
//     );
//   };

//   function SearchBar(){
//     const refSearch = useRef(); 

//     const onInputChange = evt => {
//         evt.preventDefault(); // prevents from going back to null 
//         const searchQuery = refSearch.current.value; 
//             setQuery(searchQuery);
//         console.log("Search bar on input", query);
//       };

//       return (
//         <div>
//           <label className="form-label">
//           Search <input className="form-control" type="search" ref={refSearch} onChange={onInputChange} />
  
//           </label>
//         </div>
//       );
//     }

const SearchBar = () => {
    const onInput = evt => {
      console.log("Search bar on input", evt.target.value);
    };

    return (
      <div>
        Search <input className="input-control" type="text" onInput={onInput} />
      </div>
    );
  };
  return (
    <div>
      <h1>Welcome to the Appointment Portal!</h1>
      <SearchBar />
      <div>
        {appointmentsData.map((appointment, index) => (
          <div key={index}>
            <p>Name: {appointment.name}</p>
            <p>Department: {appointment.department}</p>
            <p>Visit: {appointment.visit}</p>
            <p>Time: {appointment.time}</p>
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
