export interface User {
    username: string;
    password: string;
    pins: Pin[];
    starredPins: Pin[];
    bio: string;
}

export interface Comment {
    user: string;
    text: string;
}

export interface Pin {
    id: string;
    position: {
    lat: number;
    lng: number;
    };
    title: string;
    category: string;
    description: string;
    user: string;
    comments: Comment[];
}

const LOCAL_STORAGE_USERS_KEY = 'users';
const LOCAL_STORAGE_PINS_KEY = 'pins';

export const loadUsersFromLocalStorage = (): User[] => {
    try {
    const usersJSON = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
    } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return [];
    }
};

export const saveUsersToLocalStorage = (users: User[]): void => {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
};

export const loadPinsFromLocalStorage = (): Pin[] => {
    try {
    const pinsJSON = localStorage.getItem(LOCAL_STORAGE_PINS_KEY);
    return pinsJSON ? JSON.parse(pinsJSON) : [];
    } catch (error) {
    console.error('Error loading pins from localStorage:', error);
    return [];
    }
};

export const savePinsToLocalStorage = (pins: Pin[]): void => {
    localStorage.setItem(LOCAL_STORAGE_PINS_KEY, JSON.stringify(pins));
};
