import { DocumentSnapshot, DocumentReference } from 'firebase/firestore';

interface User {
    id?: string;
    rut: string;
    displayName: string;
    email: string;
    photoURL: string;
    rol?: string;
    cargo?: string;
    horas?: number;
    tareas?: string[];
    tareasReference?: DocumentReference[];
}

class UserModel implements User {
    id?: string;
    rut: string;
    displayName: string;
    email: string;
    photoURL: string;
    rol: string;
    cargo: string;
    horas: number;
    tareas: string[];
    tareasReference: DocumentReference[];

    constructor(user: User) {
        this.id = user.id;
        this.rut = user.rut;
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoURL = user.photoURL;
        this.rol = user.rol || '';
        this.cargo = user.cargo || '';
        this.horas = user.horas || 0;
        this.tareas = user.tareas || [];
        this.tareasReference = user.tareasReference || [];
    }

    static fromFirestore(document: DocumentSnapshot): UserModel {
        const data = document.data() as User;
        data.id = document.id;
        return new UserModel(data);
    }

    toMap(): any {
        return {
            displayName: this.displayName,
            rut: this.rut,
            email: this.email,
            photoURL: this.photoURL,
            rol: this.rol,
            cargo: this.cargo,
            horas: this.horas,
            tareas: this.tareas,
            tareasReference: this.tareasReference.map(ref => ref.path)
        };
    }
}

export { UserModel, User };
export default UserModel;
