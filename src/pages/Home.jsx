import { Header } from "../components/Header";


import ClickAwayListener from '@mui/material/ClickAwayListener';
import React, { useState} from 'react';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // estilos base
import 'react-date-range/dist/theme/default.css'; // tema por defecto
import { ReservationForm } from "../components/ReservationForm";


export function Home() {

    const [showCalendar, setShowCalendar] = useState(false);
    const [showPeople, setShowPeople] = useState(false);
    const [people,setPeople]= useState(1);
    const [showRooms, setShowRooms] = useState(false);
    const [rooms,setRooms]= useState(1);

    const [state, setState] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
        }
    ]);


    

    return (
            <div className=" imgHotel relative w-full h-screen bg-cover bg-center " >
                <Header />   
                <ReservationForm 
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                state={state}
                setState={setState}
                showPeople={showPeople}
                setShowPeople={setShowPeople}
                people={people}
                setPeople={setPeople}
                showRooms={showRooms}
                setShowRooms={setShowRooms}
                rooms={rooms}
                setRooms={setRooms}
                />

               
            
  
            </div>
    
    );
}