// DataContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    User,
    Pin,
    Comment,
    loadUsersFromLocalStorage,
    saveUsersToLocalStorage,
    loadPinsFromLocalStorage,
    savePinsToLocalStorage,
} from './types';

interface DataContext {
    users: User[];
    pins: Pin[];

    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;

    addUser: (user: User) => void;
    removeUser: (username: string) => void;

    addPin: (pin: Pin) => void;
    removePin: (pinId: string) => void;
    editPin: (pinId: string, updatedPin: Partial<Pin>) => void;

    addComment: (pinId: string, comment: Comment) => void;
    removeComment: (pinId: string, commentIndex: number) => void;
}

export const DataContext = createContext<DataContext | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(() => loadUsersFromLocalStorage());
    const [pins, setPins] = useState<Pin[]>(() => loadPinsFromLocalStorage());
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('currentUser');
        const storedExpiresAt = localStorage.getItem('currentUserExpiresAt');
      
        if (!storedUser || !storedExpiresAt) {
          return null; 
        }
      
        const expiresAt = parseInt(storedExpiresAt, 10);
        const now = Date.now();
      
        if (now > expiresAt) {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('currentUserExpiresAt');
          return null;
        } else {
          return JSON.parse(storedUser) as User;
        }
    });

    const addUser = (newUser: User) => {
        setUsers((prev) => {
        const updated = [...prev, newUser];
        saveUsersToLocalStorage(updated);
        return updated;
        });
    };

    const removeUser = (username: string) => {
        setUsers((prev) => {
        const updated = prev.filter((user) => user.username !== username);
        saveUsersToLocalStorage(updated);
        return updated;
        });
    };

    const addPin = (newPin: Pin) => {
        setPins((prev) => {
        const updated = [...prev, newPin];
        savePinsToLocalStorage(updated);
        return updated;
        });
    };

    const removePin = (pinId: string) => {
        setPins((prev) => {
        const updated = prev.filter((pin) => pin.id !== pinId);
        savePinsToLocalStorage(updated);
        return updated;
        });
    };

    const editPin = (pinId: string, updatedPin: Partial<Pin>) => {
        setPins((prev) => {
        const newPins = prev.map((pin) => {
            if (pin.id === pinId) {
            return { ...pin, ...updatedPin };
            }
            return pin;
        });
        savePinsToLocalStorage(newPins);
        return newPins;
        });
    };

    const addComment = (pinId: string, newComment: Comment) => {
        setPins((prev) => {
        const newPins = prev.map((pin) => {
            if (pin.id === pinId) {
            return {
                ...pin,
                comments: [...pin.comments, newComment],
            };
            }
            return pin;
        });
        savePinsToLocalStorage(newPins);
        return newPins;
        });
    };

    const removeComment = (pinId: string, commentIndex: number) => {
        setPins((prev) => {
        const newPins = prev.map((pin) => {
            if (pin.id === pinId) {
            return {
                ...pin,
                comments: pin.comments.filter((_, idx) => idx !== commentIndex),
            };
            }
            return pin;
        });
        savePinsToLocalStorage(newPins);
        return newPins;
        });
    };

    const contextValue: DataContext = {
        users,
        currentUser,
        setCurrentUser,
        pins,
        addUser,
        removeUser,
        addPin,
        removePin,
        editPin,
        addComment,
        removeComment,
    };

    return (
        <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
    );
};


export const useDataContext = (): DataContext => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};