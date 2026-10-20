import React from 'react';

import styles from './route.module.css';
import type { AppDataContextType } from '@typing/DataLoading';
import { useOutletContext } from 'react-router';

const Portfolio: React.FC = () => {
    const { portfolioProps } = useOutletContext<AppDataContextType>();

    const portfolioData = portfolioProps.pageData;

    return (
        <div className={styles.page} id="outer-container">
            <div className={styles.contentContainer} >
                
            </div>
        </div>
    )
}


export default Portfolio;