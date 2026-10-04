import { type HTMLAttributes } from "react";

import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { VFile } from "vfile";

import ComponentRegistry from "../markdown";

import styles from './component.module.css';

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    markdown: VFile;
}

const PageSection: React.FC<PageSectionProps> = ({ scrollRef, markdown, ...props }) => {
    return (
        <div className={`${styles.section} page-section`} ref={scrollRef} {...props}>
            {markdown ? (
                <ReactMarkdown components={ComponentRegistry as Components} rehypePlugins={[rehypeRaw]} >{`${markdown.value}`}</ReactMarkdown>
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

export { PageSection, SectionBorder };