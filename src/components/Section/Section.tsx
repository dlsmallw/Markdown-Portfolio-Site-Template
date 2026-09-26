import { VFile } from "vfile";
import ComponentRegistry from "../ComponentRegistry";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { HTMLAttributes, useEffect, useState } from "react";

import styles from './Section.module.css';

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    markdown: VFile;
    id: string;
}

const PageSection: React.FC<PageSectionProps> = ({ scrollRef, markdown, id }) => {
    
    return (
        <div className='section' id={id} ref={scrollRef} >
            {markdown ? (
                <ReactMarkdown components={ComponentRegistry as Components} rehypePlugins={[rehypeRaw]} >{`${markdown}`}</ReactMarkdown>
            ) : (
                <div className='container'>Loading...</div>
            )}
            {/* <div id='section-border' /> */}
        </div>
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
            id="bottom-spacer" 
            style={{ height: spacerHeight }} 
            {...props} 
        />
    )
}

interface SectionBorderProps extends HTMLAttributes<HTMLDivElement> {
    key: string;
}

const SectionBorder: React.FC<SectionBorderProps> = ({ key, ...props }) => {
    return (
        <div className={`${styles.sectionBorder} ${props.className}`} id='section-border' key={key} {...props}/>
    )
}

export { PageSection, BottomSpacer, SectionBorder };