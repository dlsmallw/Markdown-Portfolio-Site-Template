import { useEffect, type HTMLAttributes } from "react";

import styles from './component.module.css';
import { useIsMobile } from "@utils/EventListeners";

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    lastSection: boolean;
}

const PageSection: React.FC<PageSectionProps> = ({ scrollRef, lastSection, ...props }) => {
    const isMobile = useIsMobile();

    useEffect(() => {
        console.log('rerender');
    })

    return (
        <div 
            {...props} 
            className={`${styles.section} ${props.className} page-section`} 
            ref={scrollRef}
            data-is-mobile={isMobile} 
        >
            <div className={`${styles.content}  ${lastSection ? 'last-page-section' : ''}`}>
                {props.children}
            </div>
            {!lastSection && (
                <SectionBorder />
            )}
        </div>
    )
}

const SectionBorder: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div {...props} className={styles.sectionBorder} />
    )
}

export { PageSection, SectionBorder };