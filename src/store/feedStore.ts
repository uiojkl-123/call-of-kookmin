import { QueryDocumentSnapshot } from 'firebase/firestore';
import create from 'zustand';
import { devtools } from 'zustand/middleware'
import { CallFeed } from '../pages/FeedPage';
import { getFirstFeed } from '../serviece/accept.service';


interface FeedStoreType {
    feedData: CallFeed[]
    loading: boolean
    lastKey?: QueryDocumentSnapshot
    setLoading: (loading: boolean) => void
    initData: () => Promise<void>
}

const store = (set: any): FeedStoreType => ({
    feedData: [],
    loading: false,
    lastKey: undefined,
    setLoading: (loading: boolean) => set({ loading }),
    initData: async () => {
        console.log('뭐냐');
        set({ feedData: [], loading: true, lastKey: undefined })
        try {
            const response = await getFirstFeed()
            set({ feedData: response.data, loading: false, lastKey: response.lastVisible })
        }
        catch (e) {
            console.log(e)
            set({ loading: false })
        }
    }
})

export const useFeedStore = create(devtools(store));