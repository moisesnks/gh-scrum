// class Task {
//    constructor(id, autorName, autorReference, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo) {

// TaskModel.js
class TaskModel {
    constructor(id, autorName, autorReference, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo) {
        this.id = id;
        this.autorName = autorName;
        this.autorReference = autorReference;
        this.cargo = cargo;
        this.descripcion = descripcion;
        this.esfuerzo = esfuerzo;
        this.fechaCreacion = fechaCreacion;
        this.horas = horas;
        this.incertidumbre = incertidumbre;
        this.numeroTareas = numeroTareas;
        this.responsables = responsables;
        this.status = status;
        this.subtasks = subtasks;
        this.tipo = tipo;
        this.titulo = titulo;
    }
}

export default TaskModel;