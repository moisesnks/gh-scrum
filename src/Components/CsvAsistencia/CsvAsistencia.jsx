import React, { useState, useEffect } from 'react';
import './CsvAsistencia.css';
import CircleProgress from '../CircleProgress';

const parseDateSafe = (dateStr) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const date = new Date(formattedDate);
        date.setHours(0, 0, 0, 0);
        // sumarle un día
        date.setDate(date.getDate() + 1);
        if (!isNaN(date.getTime())) {
            return date;
        } else {
            console.error("Invalid date format after rearrangement:", formattedDate);
        }
    } else {
        console.error("Unexpected date format:", dateStr);
    }
    return null;
};



const CsvAsistencia = ({ initialDate, endDate, logs, onConfirmAttendanceChange, onConfirmCeremonyChange }) => {
    const [users, setUsers] = useState([]);
    const [rangeDates, setRangeDates] = useState([]);
    const [userAttendance, setUserAttendance] = useState({});
    const [ceremonies, setCeremonies] = useState({});

    useEffect(() => {
        const dates = [];
        let currentDate = new Date(initialDate);
        currentDate.setHours(0, 0, 0, 0);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setRangeDates(dates);
    }, [initialDate, endDate]);

    useEffect(() => {
        const usersFromLogs = Object.keys(logs).reduce((acc, date) => {
            const attendees = logs[date].attendance;
            Object.keys(attendees).forEach(name => {
                if (!acc[name]) {
                    acc[name] = { email: name + '@example.com', displayName: name };
                }
            });
            return acc;
        }, {});

        setUsers(Object.values(usersFromLogs));

        const attendanceState = {};
        const ceremoniesState = {};
        Object.keys(logs).forEach(date => {
            const parsedDate = parseDateSafe(date);
            if (!parsedDate) {
                return; // Skip this date if invalid
            }
            const dateIso = parsedDate.toISOString();
            ceremoniesState[dateIso] = logs[date].ceremony;

            const attendees = logs[date].attendance;
            Object.keys(attendees).forEach(name => {
                if (!attendanceState[name]) {
                    attendanceState[name] = {};
                }
                attendanceState[name][dateIso] = attendees[name];
            });
        });

        // Calculate attendance percentages for each user
        const updatedAttendanceState = {};
        Object.keys(attendanceState).forEach(user => {
            const attendanceCount = Object.values(attendanceState[user]).filter(Boolean).length;
            const totalDays = Object.keys(ceremoniesState).length;
            const attendancePercentage = (attendanceCount / totalDays * 100).toFixed(0);
            updatedAttendanceState[user] = {
                ...attendanceState[user],
                attendancePercentage: attendancePercentage
            };
        });

        setUserAttendance(updatedAttendanceState);
        setCeremonies(ceremoniesState);
    }, [logs]);


    const handleAttendanceChange = (email, date) => {
        if (window.confirm("Are you sure you want to change the attendance?")) {
            setUserAttendance(prevAttendance => {
                const newAttendance = { ...prevAttendance };
                if (!newAttendance[email]) {
                    newAttendance[email] = {};
                }
                newAttendance[email][date] = !newAttendance[email][date];

                onConfirmAttendanceChange(email, date, newAttendance[email][date]);
                return newAttendance;
            });
        }
    };

    const handleCeremonyChange = (date, value) => {
        if (window.confirm("Are you sure you want to change the ceremony?")) {
            setCeremonies(prevCeremonies => {
                const newCeremonies = { ...prevCeremonies, [date]: value };
                // Aquí deberías llamar a onConfirmCeremonyChange con los nuevos valores
                onConfirmCeremonyChange(date, value);
                return newCeremonies;
            });
        }
    };



    return (
        <div className="asistencia-csv-importer">
            <div className="asistencia-fecha-container">
                <h2>{`Sprint comprendido desde ${initialDate.toLocaleDateString()} hasta ${endDate.toLocaleDateString()}`}</h2>
            </div>
            <div className="asistencia-table-wrapper">
                <div className="asistencia-table-container">
                    <div className="asistencia-table-headers">
                        <div className="cell">Fechas</div>
                        {rangeDates.map(date => (
                            <div key={date.toISOString()} className="cell">{date.toLocaleDateString()}</div>
                        ))}
                    </div>
                    <div className="asistencia-table-content">
                        <div className="asistencia-table-row">
                            <div className="cell">Ceremonias</div>
                            {rangeDates.map(date => (
                                <div key={date.toISOString()} className="cell">
                                    {ceremonies[date.toISOString()] ? (
                                        ceremonies[date.toISOString()]
                                    ) : (
                                        <select
                                            value={ceremonies[date.toISOString()] || ''}
                                            onChange={(e) => handleCeremonyChange(date.toISOString(), e.target.value)}
                                        >
                                            <option value="">Select Ceremony</option>
                                            <option value="Sprint Check">Sprint Check</option>
                                            <option value="Planning">Planning</option>
                                            <option value="Retrospective">Retrospective</option>
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                        {users.map(user => (
                            <div key={user.email} className="asistencia-table-row">
                                <div className="cell dname">
                                    <span> {user.displayName} </span>
                                    {userAttendance[user.displayName] && ( // Check if userAttendance[user.displayName] exists
                                        <CircleProgress
                                            value={userAttendance[user.displayName].attendancePercentage}
                                            size={"2.5em"}
                                            color="green"
                                            textColor='black'
                                        />
                                    )}
                                </div>
                                {rangeDates.map(date => (
                                    <input
                                        type="checkbox"
                                        key={`${user.email}-${date.toISOString()}`}
                                        className="cell checkbox-input"
                                        checked={userAttendance[user.displayName] && userAttendance[user.displayName][date.toISOString()]}
                                        onChange={() => handleAttendanceChange(user.displayName, date.toISOString())}
                                        disabled={!ceremonies[date.toISOString()]}
                                    />
                                ))}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CsvAsistencia;
