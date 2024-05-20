import React, { useEffect } from 'react';
import { useAuth } from './Hooks/useAuth';

const TitleUpdater = () => {
    const { user } = useAuth();

    useEffect(() => {
        console.log('User:', user)
        if (user && user.displayName) {
            document.title = `@${user.displayName} - LumoAgile`;
        } else {
            document.title = 'LumoAgile';
        }
    }, [user]);

    return null;
};

export default TitleUpdater;
