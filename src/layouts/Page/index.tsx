import React, { useRef, type HTMLAttributes } from 'react';

import styles from './layout.module.css';
import { SidePanel } from '@components/SidePanel';

import type { ScrollWrapperProps } from '@components/ScrollWrapper';
import ScrollWrapper from '@components/ScrollWrapper';
import { useIsMobile } from '@utils/EventListeners';

export const ContentContainer: React.FC<ScrollWrapperProps> = ({ ...props }) => {
    return (
        <ScrollWrapper 
            {...props} 
            className={`${props.className} ${styles.contentContainer} ${styles.centerGrid}`} 
            id='content-container' 
        />
    );
}

export const LeftSideBar: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <SidePanel {...props} className={`${props.className} ${styles.leftGrid}`} id='left-panel' />
    );
}

export const RightSideBar: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <SidePanel {...props} className={`${props.className} ${styles.rightGrid}`} id='right-panel' />
    );
}

const PageContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            {...props} 
            ref={containerRef} 
            className={styles.page} 
            data-is-mobile={isMobile}
        />
    );
}

export default PageContainer;