import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './ModalAdditionalAssigned.css'; // Asegúrate de tener un archivo CSS para los estilos del modal
import { EyeIcon } from '../Icons';

const ModalAdditionalAssigned = ({ additionalAssigned }) => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <span className="circle" onClick={onOpenModal}>
                <span className="circle-content">{`+${additionalAssigned.length-1}`}</span>
                <EyeIcon className="eye-icon" />
            </span>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="modal-content">
                    <h2>Asignados</h2>
                    {additionalAssigned.map((additional, index) => (
                        <div key={index} className="additional-item">
                            <div className="additional-info">
                                {/* Verificar si hay un icono definido para el participante */}
                                {additional.icon ? (
                                    <img src={additional.icon} alt={additional.name} />
                                ) : (
                                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(additional.name)}`} alt={additional.name} />
                                )}
                                <span>{additional.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default ModalAdditionalAssigned;
