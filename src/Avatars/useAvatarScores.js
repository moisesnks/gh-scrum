import { useState } from 'react';

const useAvatarScores = (initialAvatars) => {
    const [avatars, setAvatars] = useState(initialAvatars);

    const updateAvatarScore = (avatarId, scoreToAdd) => {
        setAvatars((prevAvatars) =>
            prevAvatars.map((avatar) =>
                avatar.id === avatarId ? { ...avatar, score: avatar.score + scoreToAdd } : avatar
            )
        );
    };

    return { avatars, updateAvatarScore };
};

export default useAvatarScores;