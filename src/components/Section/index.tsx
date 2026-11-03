import { type HTMLAttributes } from "react";

import styles from './component.module.css';
import { useIsMobile } from "@utils/EventListeners";
import type { Components } from "node_modules/react-markdown/lib";
import { motion } from "framer-motion";

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    lastSection: boolean;
}

const PageSection: React.FC<PageSectionProps> = ({ scrollRef, lastSection, ...props }) => {
    const isMobile = useIsMobile();

    return (
        
        <div 
            {...props} 
            className={`${styles.section} ${props.className} page-section`} 
            ref={scrollRef}
            data-is-mobile={isMobile} 
        >
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <div 
                    className={`${styles.content}  ${lastSection ? 'last-page-section' : ''}`}
                    id={`${props.id ? `${props.id}-` : ''}content`}
                >
                    {props.children}
                </div>
            </motion.div>
        </div>
    )
}

const SectionHeader: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ ...props }) => {
    return (
        <div className={styles.sectionHeaderContainer}>
            <div className={styles.headerDivider}>
                <h2 {...props} className={`${styles.sectionHeader} ${props.className ?? ''}`} />
            </div>
            <div className={styles.headerDivider}>
                <span className={styles.sectionHeaderDivider} />
            </div>
            
        </div>
        
    )
}
    
const SectionBorder: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div {...props} className={styles.sectionBorder} />
    )
}

const ComponentRegistry = {
    ['page-section']: PageSection,
    ['section-heading']: SectionHeader,
    ['section-border']: SectionBorder,
} as Components;

export { PageSection, SectionBorder, ComponentRegistry };