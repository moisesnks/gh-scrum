import { DocumentSnapshot, DocumentReference, Timestamp } from '../../firebaseConfig';
import { doc, getFirestore } from 'firebase/firestore';

interface Subtask {
    label: string;
    completada: boolean;
}

interface Task {
    id?: string;
    titulo: string;
    descripcion: string;
    autorReference: DocumentReference | string;
    autorName: string;
    fechaCreacion: Timestamp;
    tipo: string;
    cargo: string;
    numeroTareas: number;
    esfuerzo?: number;
    incertidumbre?: number;
    horas?: number;
    status: string;
    subtasks: Subtask[];
    responsables?: DocumentReference[];
}

class TaskModel implements Task {
    titulo: string;
    descripcion: string;
    autorReference: DocumentReference;
    autorName: string;
    fechaCreacion: Timestamp;
    tipo: string;
    cargo: string;
    numeroTareas: number;
    esfuerzo: number;
    incertidumbre: number;
    horas: number;
    status: string;
    subtasks: Subtask[];
    responsables?: DocumentReference[];

    constructor(task: Task) {
        this.titulo = task.titulo;
        this.descripcion = task.descripcion;
        this.autorName = task.autorName;
        this.fechaCreacion = task.fechaCreacion;
        this.tipo = task.tipo;
        this.cargo = task.cargo;
        this.numeroTareas = task.numeroTareas;
        this.esfuerzo = task.esfuerzo || 0;
        this.incertidumbre = task.incertidumbre || 0;
        this.horas = task.horas || 0;
        this.status = task.status;
        this.subtasks = task.subtasks;
        this.responsables = task.responsables;

        // Convierte autorReference de string a DocumentReference si es un string (uid)
        if (typeof task.autorReference === 'string') {
            this.autorReference = doc(getFirestore(), 'users', task.autorReference);
        } else {
            this.autorReference = task.autorReference;
        }
    }

    static fromFirestore(document: DocumentSnapshot): TaskModel {
        const data = document.data() as Task;
        data.id = document.id;
        const subtasks = (data.subtasks || []);
        const responsables = (data.responsables || []) as DocumentReference[];
        return new TaskModel({
            ...data,
            subtasks,
            responsables
        });
    }

    toFirestore(): any {
        return {
            titulo: this.titulo,
            descripcion: this.descripcion,
            autorReference: this.autorReference instanceof DocumentReference ? this.autorReference : this.autorReference,
            autorName: this.autorName,
            fechaCreacion: this.fechaCreacion,
            tipo: this.tipo,
            cargo: this.cargo,
            numeroTareas: this.numeroTareas,
            esfuerzo: this.esfuerzo,
            incertidumbre: this.incertidumbre,
            horas: this.horas,
            status: this.status,
            subtasks: this.subtasks.map((subtask) => ({ label: subtask.label, completada: subtask.completada })),
            responsables: this.responsables?.map((ref) => ref.path)
        };
    }
}




export { TaskModel };
export default TaskModel;