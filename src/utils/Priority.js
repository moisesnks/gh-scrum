// Priority.js
const getPriorityStyles = (priority) => {
    switch (priority) {
        case 'P0':
            return {
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderRadius: '5px'
                // Agrega otros estilos según sea necesario
            };
        case 'P1':
            return {
                backgroundColor: 'rgba(255, 165, 0, 0.5)',
                borderRadius: '3px'
                // Agrega otros estilos según sea necesario
            };
        case 'P2':
            return {
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                borderRadius: '2px'
                // Agrega otros estilos según sea necesario
            };
        default:
            return {};
    }
};

export default { getPriorityStyles };
