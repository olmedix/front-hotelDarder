import { Header } from "../components/Header";
import { FaHotel } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBed } from "react-icons/fa";

import ClickAwayListener from '@mui/material/ClickAwayListener';
import React, { useState} from 'react';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // estilos base
import 'react-date-range/dist/theme/default.css'; // tema por defecto
import { format } from "date-fns";

export function Home() {

    const [showCalendar, setShowCalendar] = useState(false);
    const [state, setState] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
        }
    ]);

    const handleClickAway = () => {
        setShowCalendar(false);
      };
    

    return (
            <div className=" imgHotel relative w-full h-screen bg-cover bg-center " >
                <Header />                

                <section className="absolute w-3/5 h-22 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-[#FFFFF0] border
                rounded-2xl">

                    <div className="flex h-full text-black">
                    <div className="h-full border-r w-2/7">
                        <h5 className="font-semibold mt-1 mb-3">DESTINO</h5>
                        <p className="flex ml-3tems-center justify-center">
                            <span className="mr-2 mt-1 text-[#0097e6]"><FaHotel /></span> 
                            Hotel Emili Darder
                        </p>
                    </div>

                    <div className="h-full border-r w-1/4">
                        <button 
                            className="w-full h-full"
                            onClick={() => setShowCalendar(!showCalendar)}>
                            <h5 className="font-semibold -mt-5 mb-3">FECHAS</h5>

                            {`${format(state[0].startDate, 'yyyy/MM/dd')} - ${format(state[0].endDate, 'yyyy/MM/dd')}`}
                        </button>
                        {showCalendar && (
                            <ClickAwayListener onClickAway={handleClickAway}>
                            <div className="absolute z-50">
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setState([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={state}
                                    months={2}
                                    minDate={new Date()}
                                    direction="horizontal"
                                />
                            </div>
                            </ClickAwayListener>
                        )}
                    </div>

                    <div className="h-full border-r w-44">
                        <button className="w-full h-full text-left">
                            <h5 className="relative font-semibold text-center -top-4">PERSONAS</h5>
                            <p className="flex text-center items-center justify-center">
                            <FaUser className="text-1xl text-[#0097e6]"/>
                            <span className="relative pl-2 text-lg">1</span>
                            </p>   
                        </button>
                       
                    </div>

                    <div className="h-full border-r w-44">
                        <button className="w-full h-full text">
                            <h5 className="relative font-semibold -top-4">HABITACIONES</h5>
                            <p className="flex text-center items-center justify-center">
                            <FaBed  className="text-2xl text-[#0097e6]"/>
                            <span className="relative -mt-0.5 pl-3 text-lg">1</span>
                            </p>   
                        </button>
                       
                    </div>

                        <div className="w-1/6">
                            <button className="w-full h-full bg-[#0097e6] text-white font-bold text-2xl rounded-br-2xl rounded-tr-2xl">Buscar</button>
                        </div>
                    </div>
                    
                    

                </section>
            
  
            </div>
    
    );
}