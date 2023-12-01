import {create} from 'zustand';

interface AppState {
    language: string;
    translationEngine: string;
    displayFeaturedMenu: boolean;
    color: string;

    setLanguage: (language: string) => void;
    setTranslationEngine: (translationEngine: string) => void;
    setDisplayFeaturedMenu: (displayFeaturedMenu: boolean) => void;
    setColor: (color: string) => void;
}

const useStore = create<AppState>()((set) => ({
    language: typeof localStorage !== 'undefined' ? localStorage.getItem('language') || 'de' : 'de',
    translationEngine: typeof localStorage !== 'undefined' ? localStorage.getItem('translationEngine') || 'myMemory' : 'myMemory',
    displayFeaturedMenu: typeof localStorage !== 'undefined' ? localStorage.getItem('displayFeaturedMenu') === 'true' : true,
    color: typeof localStorage !== 'undefined' ? localStorage.getItem('color') || '#5d5dff' : '#5d5dff',


    setLanguage: (language: string) => {
        localStorage.setItem('language', language);
        set({ language });
    },

    setTranslationEngine: (translationEngine: string) => {
        localStorage.setItem('translationEngine', translationEngine);
        set({ translationEngine });
    },

    setDisplayFeaturedMenu: (displayFeaturedMenu: boolean) => {
        localStorage.setItem('displayFeaturedMenu', displayFeaturedMenu.toString());
        set({ displayFeaturedMenu });
    },

    setColor: (color: string) => {
        localStorage.setItem('color', color);
        set({ color });
    },
}));

export default useStore;