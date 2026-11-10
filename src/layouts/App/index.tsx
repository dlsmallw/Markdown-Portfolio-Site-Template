import React, { createContext, useCallback, useContext, useMemo, useState, type HTMLAttributes } from 'react';

import { Navbar } from '@components';

import styles from './layout.module.css';

interface AppStateProviderProps {
    setSidebarContent: (content: React.ReactNode) => void;
};

const AppStateContext = createContext<AppStateProviderProps>({
    setSidebarContent: () => null
});

const AppLayout: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    const [content, setContent] = useState<React.ReactNode | null>(null)

    const setSidebarContent = useCallback((content: React.ReactNode) => {
        setContent(content);
    }, []);

    const appStateCtx = useMemo(() => ({
        setSidebarContent
    }), [setSidebarContent]);

    return (
        <AppStateContext.Provider value={appStateCtx} >
            <div className={styles.app}>
                <Navbar sidebarContent={content} />
                <main className={styles.main}>
                    
                    {props.children}
                </main>
            </div>
        </AppStateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppState = () => {
    return useContext(AppStateContext);
}

export default AppLayout;