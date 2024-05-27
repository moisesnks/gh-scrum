import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker({ onDateRangeChange, initialStartDate, initialEndDate }) {
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    useEffect(() => {
        setStartDate(initialStartDate);
        setEndDate(initialEndDate);
    }, [initialStartDate, initialEndDate]);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        // Llamar a la función proporcionada por el padre con las fechas seleccionadas
        onDateRangeChange({ startDate: start, endDate: end });
    };

    const filterMonday = (date) => {
        // Obtener el día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)
        const day = date.getDay();
        // Solo permitir seleccionar lunes (día de la semana 1)
        return day === 1;
    };

    return (
        <div>
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                inline
                filterDate={filterMonday}
            />
        </div>
    );
}

export default DateRangePicker;
