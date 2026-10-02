import React from 'react';

import { Navbar } from '@components/Navbar';

import styles from './MainLayout.module.css';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.app}>
            <Navbar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default MainLayout;