import { VFile } from "vfile";
import ComponentRegistry from "../ComponentRegistry";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { HTMLAttributes, useEffect, useState } from "react";

import styles from './Section.module.css';

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    markdown: VFile;
}

interface SectionBorderProps extends HTMLAttributes<HTMLDivElement> {
    key: string;
}

const PageSection: React.FC<PageSectionProps> = ({ scrollRef, markdown, ...props }) => {
    
    return (
        <div className='section' ref={scrollRef} {...props}>
            {markdown ? (
                <ReactMarkdown components={ComponentRegistry as Components} rehypePlugins={[rehypeRaw]} >{`${markdown}`}</ReactMarkdown>
            ) : (
                <div className='container'>Loading...</div>
            )}
            {/* <div id='section-border' /> */}
        </div>
    )
}

const SectionBorder: React.FC<SectionBorderProps> = ({ key, ...props }) => {
    return (
        <div 
            className={`${styles.sectionBorder} ${props.className}`} 
            key={key} 
            {...props}
        />
    )
}

const BottomSpacer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    const [spacerHeight, setSpacerHeight] = useState('0');
    const [windowDimensions, setWindowDimensions] = useState<{
        height: number;
        width: number;
    }>({ height: window.innerHeight, width: window.innerWidth});

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
        const elements = document.querySelectorAll('.section');
        const lastSectionElement = elements[elements.length - 1] as HTMLElement | null;
        const lastSectionHeight = lastSectionElement?.offsetHeight || 0;
        setSpacerHeight(`calc(var(--view-height) - ${lastSectionHeight}px)`);
    }, [windowDimensions]);
        
    return (
        <div 
            className={`${styles.bottomSpacer} ${props.className}`} 
            style={{ height: spacerHeight }} 
            {...props} 
        />
    )
}

export { PageSection, BottomSpacer, SectionBorder };