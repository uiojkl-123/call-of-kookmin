import create from 'zustand';
import { devtools } from 'zustand/middleware'

interface CurrentUser {
    userId?: string,
    userName?: string,
}

interface StoreType {
    currentUser?: CurrentUser;
    setCurrentUser: (e: CurrentUser) => void;
    currentUserReset: Function;
    loading: boolean;
}

const store = (set: any): StoreType => ({
    currentUser: undefined,
    setCurrentUser(e) {
        set((state: StoreType) => ({ currentUser: { ...state.currentUser, ...e } }));
    },
    currentUserReset() {
        set((state: StoreType) => ({ ...state, currentUser: undefined }));
    },
    loading: true,
})

export const useStore = create(devtools(store));