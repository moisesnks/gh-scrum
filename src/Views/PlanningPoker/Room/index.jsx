import React from "react";
import PlanningTable from "../../../Components/PlanningTable";

const Room = () => {
    const usersList = [
        { displayName: "Juan", selectedCard: "3" },
        { displayName: "Pedro", selectedCard: "3" },
        { displayName: "Maria", selectedCard: "3" },
        { displayName: "Jose", selectedCard: "3" },
        { displayName: "Roberto", selectedCard: "2" },

    ]

    // Función para distribuir los usuarios en la mesa de manera dinámica
    const distributeUsers = (users) => {
        const table = {
            top: [],
            left: [],
            right: [],
            bottom: [],
        };

        const usersLength = users.length;
        const usuariosPorFila = Math.ceil(usersLength / 3);
        const usuariosPorColumna = Math.ceil(usersLength / 4);

        let top = 0;
        let left = 0;
        let right = 0;
        let bottom = 0;

        for (let i = 0; i < usersLength; i++) {
            if (i < usuariosPorFila) {
                table.top.push(users[i]);
                top++;
            } else if (i < usuariosPorFila + usuariosPorColumna) {
                table.right.push(users[i]);
                right++;
            } else if (i < usuariosPorFila + usuariosPorColumna * 2) {
                table.bottom.push(users[i]);
                bottom++;
            } else {
                table.left.push(users[i]);
                left++;
            }
        }

        return table;
    };

    const [users, setUsers] = React.useState(distributeUsers(usersList));

    const handleClear = () => {
        // Limpiar las cartas seleccionadas
        const usersArray = Object.values(users).flat();
        const newUsers = usersArray.map(user => ({ ...user, selectedCard: "" }));
        const newTable = distributeUsers(newUsers);
        setUsers(newTable);
    }

    const asignarRandom = () => {
        const fibonacci = [1, 2, 3, 5];
        const usersArray = Object.values(users).flat();
        const newUsers = usersArray.map(user => ({ ...user, selectedCard: fibonacci[Math.floor(Math.random() * fibonacci.length)] }));
        const newTable = distributeUsers(newUsers);
        setUsers(newTable);

    }

    return (
        <div className="container">
            <button onClick={asignarRandom}>Asignar random</button>
            <PlanningTable users={users} onClear={handleClear} />
        </div>
    );
}

export default Room;
