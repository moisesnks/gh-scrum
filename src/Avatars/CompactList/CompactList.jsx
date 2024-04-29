import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import './CompactList.css'; // Importar el archivo CSS

const useCompactAvatarList = (avatars) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const firstAvatar = avatars[0];
    const remainingCount = avatars.length - 1;

    return {
        firstAvatar,
        remainingCount,
        showModal,
        toggleModal,
    };
};

const CompactList = ({ assignedAvatars, onRemoveAvatar }) => {
    const { firstAvatar, remainingCount, showModal, toggleModal } = useCompactAvatarList(assignedAvatars);

    return (
        <div>
            <div className="compact-avatar-container">
                <Avatar
                    {...firstAvatar}
                    isDraggable={false}
                    outletElement={remainingCount > 0 && (
                        <button onClick={toggleModal} className="compact-avatar-button">
                            +{remainingCount}
                        </button>
                    )}
                />
            </div>
            {showModal && (
                <div className="compact-modal-container">
                    <h4>Avatares Restantes</h4>
                    {assignedAvatars.map((avatar) => (
                        <div key={avatar.id} className="compact-avatar-list-item">
                            <Avatar {...avatar} isDraggable={false} />
                            <button onClick={() => onRemoveAvatar(avatar.id)} className="compact-delete-button">
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompactList;
