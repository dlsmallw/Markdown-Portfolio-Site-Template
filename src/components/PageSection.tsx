import { VFile } from "vfile";
import ComponentRegistry from "./sections/elements/ComponentRegistry";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

const PageSection: React.FC<{ 
    scrollRef: React.RefObject<HTMLDivElement | null>;
    markdown: VFile;
    id: string;
}> = ({ scrollRef, markdown, id }) => {
    return (
        <div className={'section'} id={id} ref={scrollRef} >
            {markdown ? (
                <ReactMarkdown components={ComponentRegistry as Components} rehypePlugins={[rehypeRaw]} >{`${markdown}`}</ReactMarkdown>
            ) : (
                <div className='container'>Loading...</div>
            )}
            <div id='section-border' />
        </div>
    )
}

export default PageSection;