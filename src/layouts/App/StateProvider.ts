import { useContext, createContext } from "react";

interface AppStateProviderProps {
    setSidebarContent: (content: React.ReactNode) => void;
};

export const AppStateContext = createContext<AppStateProviderProps>({
    setSidebarContent: () => null
});

export const useAppState = () => {
    return useContext(AppStateContext);
};