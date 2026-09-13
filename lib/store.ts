import {create} from 'zustand';

interface AppState {
    language: string;
    displayFeaturedMenu: boolean;
    color: string;
    selectedMensa: string;
    selectedViewMode: string;

    setLanguage: (language: string) => void;
    setDisplayFeaturedMenu: (displayFeaturedMenu: boolean) => void;
    setColor: (color: string) => void;
    setSelectedMensa: (selectedMensa: string) => void;
    setSelectedViewMode: (selectedViewMode: string) => void;
}

const useStore = create<AppState>()((set) => ({
    language: typeof window !== 'undefined' ? localStorage.getItem('language') || 'de' : 'de',
    displayFeaturedMenu: typeof window !== 'undefined' ? localStorage.getItem('displayFeaturedMenu') === 'true' : false,
    color: typeof window !== 'undefined' ? localStorage.getItem('color') || '#de3919' : '#de3919',
    selectedMensa: typeof window !== 'undefined' ? localStorage.getItem('selectedMensa') || 'htp' : 'htp',
    selectedViewMode: typeof window !== 'undefined' ? localStorage.getItem('selectedViewMode') || 'text' : 'text',


    setLanguage: (language: string) => {
        if (typeof window !== 'undefined') localStorage.setItem('language', language);
        set({ language });
    },

    setDisplayFeaturedMenu: (displayFeaturedMenu: boolean) => {
        if (typeof window !== 'undefined') localStorage.setItem('displayFeaturedMenu', displayFeaturedMenu.toString());
        set({ displayFeaturedMenu });
    },

    setColor: (color: string) => {
        if (typeof window !== 'undefined') localStorage.setItem('color', color);
        set({ color });
    },

    setSelectedMensa: (selectedMensa: string) => {
        if (typeof window !== 'undefined') localStorage.setItem('selectedMensa', selectedMensa);
        set({ selectedMensa });
    },

    setSelectedViewMode: (selectedViewMode: string) => {
        if (typeof window !== 'undefined') localStorage.setItem('selectedViewMode', selectedViewMode);
        set({ selectedViewMode });
    },
}));

export default useStore;