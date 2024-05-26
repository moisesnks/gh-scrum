import React, { useState } from 'react';

import './Topico.css';

export function ChangeTopicModal({ topic, setTopic, setShowModal }) {
    const [newTopic, setNewTopic] = useState(topic);

    const handleSaveTopic = () => {
        setTopic(newTopic);
        setShowModal(false);
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className='h3'> Editar tópico </span>
                <textarea value={newTopic} onChange={(e) => setNewTopic(e.target.value)} />
                <div className="modal-buttons">
                    <button onClick={() => setShowModal(false)}> Cancelar </button>
                    <button onClick={handleSaveTopic}> Guardar </button>
                </div>
            </div>
        </div>
    );
}



function Topico({ topic, setTopic, isAdmin }) {
    // si es admin, entonces puede editar el topic,
    // lo editará a través de un modal 
    const [newTopic, setNewTopic] = useState(topic);

    const [showModal, setShowModal] = useState(false);

    const handleEditTopic = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSaveTopic = () => {
        setTopic(newTopic);
        setShowModal(false);
    }

    return (
        <div className="topico">
            <div className="content">
                <span className='topic'>{topic}</span>
                {isAdmin && <span className='topic-edit-button' onClick={handleEditTopic}> ✏️ </span>}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className='h3'> Editar tópico </span>
                        <textarea value={newTopic} onChange={(e) => setNewTopic(e.target.value)} />
                        <div className="modal-buttons">
                            <button onClick={handleCloseModal}> Cancelar </button>
                            <button onClick={handleSaveTopic}> Guardar </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Topico;