import { type HTMLAttributes } from "react";

import styles from './component.module.css';
import { useIsMobile } from "@utils/event-listeners";
import { motion } from "framer-motion";
import type { Components } from "react-markdown";

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    lastSection: boolean;
}

export const PageSection: React.FC<PageSectionProps> = ({ scrollRef, lastSection, ...props }) => {
    const isMobile = useIsMobile();

    return (
        
        <div 
            {...props} 
            className={`${styles.section} ${props.className ?? ''} page-section`} 
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

export const SectionHeader: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ ...props }) => {
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
    
export const SectionBorder: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div {...props} className={styles.sectionBorder} />
    )
}

const ComponentRegistry = {
    ['page-section']: PageSection,
    ['section-heading']: SectionHeader,
    ['section-border']: SectionBorder,
} as Components;


// Dynamically imports the section markdown components from the each subdirectory
const modules = import.meta.glob<Components>("./*/index.tsx", {
  import: "default",
  eager: true,
});

for (const [fp, importRegistry] of Object.entries(modules)) {
  console.log(`Loading component registry from ${fp}`);

  // Exclude the root registry itself
  if (fp === "./index.tsx") continue;

  Object.assign(ComponentRegistry, importRegistry);
}

export default ComponentRegistry;