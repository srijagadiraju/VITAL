import React, { useState } from "react";
import "./portal.css";

const Portal = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const appointments = [{name: "", department: ""}];


    function renderAppointments(){
        return <div>
          {appointments.map()}  


        </div>
    }
  
    return (
        <div>
            <h1>Welcome to the Appointment Portal!</h1>

            {renderAppointments()};
        </div>
    );
}

export default Portal;