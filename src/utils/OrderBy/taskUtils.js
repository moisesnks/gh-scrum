// taskUtils.js

export const getFieldNumericValue = (task, field) => {
    const normalizedField = field.toLowerCase();
    let numericValue;

    if (normalizedField === 'estimate') {
        // Convertir el estimate a número entero
        numericValue = parseInt(task.project_info.Estimate) || 0;
    } else if (normalizedField === 'id') {
        // Usar directamente el ID de la tarea como valor numérico
        numericValue = task.id;
    } else if (normalizedField === 'priority') {
        // Puede ser ["P0", "P1", "P2"]
        // Convertir a un valor numérico para ordenar
        numericValue = parseInt(task.project_info.Priority.replace('P', '')) || 0;
    } else if (normalizedField === 'size') {
        // Puede ser ["S", "M", "L", "XL"]
        // Convertir a un valor numérico para ordenar
        const sizeMap = { S: 0, M: 1, L: 2, XL: 3 };
        numericValue = sizeMap[task.project_info.Size] || 0;
    }
    return numericValue;
};
