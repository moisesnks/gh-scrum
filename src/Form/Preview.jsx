import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './preview.css';

export const parseToMarkdown = (submittedTask) => {
    const { tag, title, description, tasks, observations, dueDate } = submittedTask;

    // Capitalizar tag
    const capitalizeTag = tag.charAt(0).toUpperCase() + tag.slice(1);

    // Parsear la descripción a Markdown
    const markdownDescription = `## Descripción\n${description}`;

    // Parsear las tareas a Markdown
    const markdownTasks = tasks.map(task => `* [ ] ${task.label}: ${task.description}`).join('\n');

    // Parsear las observaciones a Markdown
    const markdownObservations = `> ${observations}`;

    // Duedate es un string en formato yyyy-mm-dd, debemos invertirlo para que quede dd-mm-yyyy
    const dueDateParts = dueDate.split('-');
    const dueDateFormatted = dueDateParts.reverse().join('-');
    const markdownDueDate = `## Fecha de Vencimiento\nSe ha definido la fecha de entrega para el día ${dueDateFormatted}`;

    // Unir todas las partes en un solo string de Markdown
    const markdownContent = `${markdownDescription}\n\n## Tareas\n${markdownTasks}\n\n${markdownObservations}\n\n${markdownDueDate}`;

    return markdownContent;
};

const Modal = ({ message, onClose }) => {
    setTimeout(() => {
        onClose();
    }, 3000);

    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
            </div>
        </div>
    );
};

export const TaskPreview = ({ submittedTask }) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const title = `(${submittedTask.tag}) ${submittedTask.title}`;

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCopyTitle = () => {
        navigator.clipboard.writeText(`(${submittedTask.tag}) ${submittedTask.title}`)
            .then(() => {
                setShowModal(true);
                setMessage('Título copiado al portapapeles');
            })
            .catch(error => console.error('Error al copiar al portapapeles: ', error));
    };

    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(parseToMarkdown(submittedTask))
            .then(() => {
                setShowModal(true);
                setMessage('Markdown copiado al portapapeles');
            })
            .catch(error => console.error('Error al copiar al portapapeles: ', error));
    };

    return (
        <div className='preview-container'>
            <div className="preview-title">
                <h1>{title}</h1>
            </div>
            <ReactMarkdown className="task-preview" remarkPlugins={[gfm]}>
                {parseToMarkdown(submittedTask)}
            </ReactMarkdown>
            {showModal && <Modal message={message} onClose={closeModal} />}
        </div>
    );
};

export default TaskPreview;
