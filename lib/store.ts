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
    language: typeof localStorage !== 'undefined' ? localStorage.getItem('language') || 'de' : 'de',
    displayFeaturedMenu: typeof localStorage !== 'undefined' ? localStorage.getItem('displayFeaturedMenu') === 'true' : false,
    color: typeof localStorage !== 'undefined' ? localStorage.getItem('color') || '#de3919' : '#de3919',
    selectedMensa: typeof localStorage !== 'undefined' ? localStorage.getItem('selectedMensa') || 'htp' : 'htp',
    selectedViewMode: typeof localStorage !== 'undefined' ? localStorage.getItem('selectedViewMode') || 'text' : 'text',


    setLanguage: (language: string) => {
        localStorage.setItem('language', language);
        set({ language });
    },

    setDisplayFeaturedMenu: (displayFeaturedMenu: boolean) => {
        localStorage.setItem('displayFeaturedMenu', displayFeaturedMenu.toString());
        set({ displayFeaturedMenu });
    },

    setColor: (color: string) => {
        localStorage.setItem('color', color);
        set({ color });
    },

    setSelectedMensa: (selectedMensa: string) => {
        localStorage.setItem('selectedMensa', selectedMensa);
        set({ selectedMensa });
    },

    setSelectedViewMode: (selectedViewMode: string) => {
        localStorage.setItem('selectedViewMode', selectedViewMode);
        set({ selectedViewMode });
    },
}));

export default useStore;