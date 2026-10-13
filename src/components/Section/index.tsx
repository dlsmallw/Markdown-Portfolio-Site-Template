import { type HTMLAttributes } from "react";
import { VFile } from "vfile";

import styles from './component.module.css';

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    markdown?: VFile;
}

const PageSection: React.FC<PageSectionProps> = ({ scrollRef, ...props }) => {
    return (
        <div {...props} className={`${styles.section}${`${props.className ? " " + props.className : ""}`} page-section`} ref={scrollRef} />
    )
}

const SectionBorder: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div 
            className={styles.sectionBorder} 
            {...props}
        />
    )
}

export { PageSection, SectionBorder };