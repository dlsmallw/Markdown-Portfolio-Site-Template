import React, { useCallback, useMemo, useState, type HTMLAttributes } from 'react';

import { Navbar } from '@components';

import styles from './layout.module.css';
import { AppStateContext } from './StateProvider';


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

export default AppLayout;