import React, { useState } from 'react';
import './CsvImporter.css';

const CsvImporter = ({ onSave }) => {
    const [csvData, setCsvData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target.result;
            const rows = text.split('\n');
            const headers = rows[0].split(';');
            const data = rows.slice(1).map(row => {
                const values = row.split(';');
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header.trim()] = values[index] ? values[index].trim() : '';
                });
                return obj;
            }).filter(row => Object.values(row).some(value => value !== ''));
            setCsvData(data);
        };

        reader.readAsText(file);
    };

    const handleSave = () => {
        onSave(csvData);
    };

    const handleFieldChange = (index, field, value) => {
        const updatedData = [...csvData];
        updatedData[index][field] = value;
        setCsvData(updatedData);
    };

    const handleAddRow = () => {
        const newRow = {
            displayName: '',
            rut: '',
            email: '',
            password: '',
            cargo: '',
            capacidad: '',
            equipo: ''
        };
        setCsvData([...csvData, newRow]);
    };

    return (
        <div className="csv-importer">
            <div className="upload-file">
                <input type="file" onChange={handleFileUpload} />
                <label htmlFor="file">Subir Archivo CSV</label>
            </div>
            <div className="csv-buttons">
                <button onClick={handleAddRow} className="add-row-button">Añadir Fila</button>
                <button onClick={handleSave} className="csv-save-button">Guardar Cambios</button>
            </div>
            {csvData.length > 0 && (
                <div className="table-container">
                    <div className="table-headers">
                        <div>Nombre</div>
                        <div>RUT</div>
                        <div>Email</div>
                        <div>Contraseña</div>
                        <div>Cargo</div>
                        <div>Capacidad</div>
                        <div>Equipo</div>
                    </div>
                    <div className="table-content">
                        {csvData.map((row, index) => (
                            <div key={index} className="table-row">
                                <input type="text" value={row.displayName} onChange={(e) => handleFieldChange(index, 'displayName', e.target.value)} />
                                <input type="text" value={row.rut} onChange={(e) => handleFieldChange(index, 'rut', e.target.value)} />
                                <input type="email" value={row.email} onChange={(e) => handleFieldChange(index, 'email', e.target.value)} />
                                <input type="password" value={row.password} onChange={(e) => handleFieldChange(index, 'password', e.target.value)} />
                                <input type="text" value={row.cargo} onChange={(e) => handleFieldChange(index, 'cargo', e.target.value)} />
                                <input type="text" value={row.capacidad} onChange={(e) => handleFieldChange(index, 'capacidad', e.target.value)} />
                                <input type="text" value={row.equipo} onChange={(e) => handleFieldChange(index, 'equipo', e.target.value)} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CsvImporter;
