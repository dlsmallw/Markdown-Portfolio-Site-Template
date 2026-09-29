import { VFile } from "vfile";
import ComponentRegistry from "../markdown";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { HTMLAttributes, useEffect, useState } from "react";

import styles from './component.module.css';

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    markdown: VFile;
}

const PageSection: React.FC<PageSectionProps> = ({ scrollRef, markdown, ...props }) => {
    // console.log(ComponentRegistry)
    return (
        <div className={`${styles.section} page-section`} ref={scrollRef} {...props}>
            {markdown ? (
                <ReactMarkdown components={ComponentRegistry as Components} rehypePlugins={[rehypeRaw]} >{`${markdown}`}</ReactMarkdown>
            ) : (
                <div className='container'>Loading...</div>
            )}
        </div>
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

const BottomSpacer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    const [spacerHeight, setSpacerHeight] = useState('0');
    const [windowDimensions, setWindowDimensions] = useState({ height: window.innerHeight, width: window.innerWidth});

    const handleWindowResize = () => {
        setWindowDimensions((prev) => ({ ...prev, height: window.innerHeight, width: window.innerWidth }));
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    useEffect(() => {   
        const elements = document.querySelectorAll('.page-section');
        const lastSectionElement = elements[elements.length - 1] as HTMLElement | null;
        const lastSectionHeight = lastSectionElement?.offsetHeight || 0;
        setSpacerHeight(`calc(var(--view-height) - ${lastSectionHeight}px)`);
    }, [windowDimensions]);
        
    return (
        <div className={styles.bottomSpacer} style={{ height: spacerHeight }} {...props} />
    )
}

export { PageSection, BottomSpacer, SectionBorder };