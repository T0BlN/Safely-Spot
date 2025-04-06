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

// Mock incident to display on the map (replace with actual data later)
const mockIncident: Pin = {
  id: '1',
  position: {
    lat: 42.3866, // Center coordinates from your Map.tsx
    lng: -72.5314
  },
  title: 'Example Incident',
  category: 'Alert',
  description: 'This is an example incident to demonstrate how pins appear on the map.',
  user: 'System',
  comments: []
};

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

    addPinToUser: (username: string, pin: Pin) => void;
    removePinFromUser: (username: string, pinId: string) => void;

    addStarredPinToUser: (username: string, pin: Pin) => void;
    removeStarredPinFromUser: (username: string, pinId: string) => void;

    updateUserBio: (username: string, newBio: string) => void;
}

export const DataContext = createContext<DataContext | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(() => loadUsersFromLocalStorage());
    const [pins, setPins] = useState<Pin[]>(() => {
        // Load pins from localStorage or initialize with the mock incident
        const loadedPins = loadPinsFromLocalStorage();
        
        // If there are no pins in localStorage, include the mock incident
        if (loadedPins.length === 0) {
            return [mockIncident];
        }
        
        // If there are pins but none with ID '1', add the mock incident
        if (!loadedPins.some(pin => pin.id === '1')) {
            return [...loadedPins, mockIncident];
        }
        
        return loadedPins;
    });
    
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

    const addPinToUser = (username: string, newPin: Pin) => {
        setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
            if (user.username === username) {
            return {
                ...user,
                pins: [...user.pins, newPin],
            };
            }
            return user;
        });
        saveUsersToLocalStorage(updatedUsers);
        return updatedUsers;
        });
    };
    
    const removePinFromUser = (username: string, pinId: string) => {
        setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
            if (user.username === username) {
            return {
                ...user,
                pins: user.pins.filter((pin) => pin.id !== pinId),
            };
            }
            return user;
        });
        saveUsersToLocalStorage(updatedUsers);
        return updatedUsers;
        });
    };
    
    const addStarredPinToUser = (username: string, newPin: Pin) => {
        setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
            if (user.username === username) {
            return {
                ...user,
                starredPins: [...user.starredPins, newPin],
            };
            }
            return user;
        });
        saveUsersToLocalStorage(updatedUsers);
        return updatedUsers;
        });
    };
    
    const removeStarredPinFromUser = (username: string, pinId: string) => {
        setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
            if (user.username === username) {
            return {
                ...user,
                starredPins: user.starredPins.filter((pin) => pin.id !== pinId),
            };
            }
            return user;
        });
        saveUsersToLocalStorage(updatedUsers);
        return updatedUsers;
        });
    };
    
    const updateUserBio = (username: string, newBio: string) => {
        setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
            if (user.username === username) {
            return {
                ...user,
                bio: newBio,
            };
            }
            return user;
        });
        saveUsersToLocalStorage(updatedUsers);
        return updatedUsers;
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
        addPinToUser,
        removePinFromUser,
        addStarredPinToUser,
        removeStarredPinFromUser,
        updateUserBio,
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