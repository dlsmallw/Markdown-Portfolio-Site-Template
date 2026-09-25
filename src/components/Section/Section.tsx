import { VFile } from "vfile";
import ComponentRegistry from "../ComponentRegistry";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { HTMLAttributes } from "react";

import style from './Section.module.css';

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

export default PageSection;