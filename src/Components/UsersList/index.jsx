
import './Usuario.css';



function User({ user }) {
    const { displayName, photoURL, online } = user;
    return (

        <div className="usuario">
            {online ? <div className="online"></div> : <div className="offline"></div>}
            <div className='groupName'>
                <img src={photoURL} alt={displayName} />
                <span>{displayName}</span>
            </div>
        </div>
    );
}

function UsersList({ users }) {
    return (
        <div className="usuarios-list">
            <span className='h2'> Lista de Usuarios <span className='num-users'> {users.length} </span></span>
            <div className="content">
                {users.map((user) => (
                    <User key={user.displayName} user={user} />
                ))}
            </div>
        </div>
    );
}

export default UsersList;