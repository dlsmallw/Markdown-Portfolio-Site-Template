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
        <div className="page-section" id={id} ref={scrollRef} style={CustomStyles.pageSection} >
            {markdown ? (
                <ReactMarkdown components={ComponentRegistry as Components} rehypePlugins={[rehypeRaw]} >{`${markdown}`}</ReactMarkdown>
            ) : (
                <div className='container'>Loading...</div>
            )}
        </div>
    )
}

const CustomStyles: Record<string, React.CSSProperties> = {
    pageSection: {
        scrollMarginTop: 'calc(max(8vh, 50px) + 20px)',
        textAlign: 'left',
        paddingBottom: '10px',
    },
};

export default PageSection;