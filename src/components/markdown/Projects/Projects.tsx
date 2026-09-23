import { HTMLAttributes, useEffect } from "react";

const ProjectBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    // const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const elements = document.querySelectorAll("#projects-section .cursor-tooltip");
        elements.forEach((elem) => {
            elem.remove();
        });
    }, []);

    return (
        <div 
            className='projects-block' 
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            >
            {children}
        </div>
    )
}

const ProjectsComponentRegistry = {
    projectblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <ProjectBlock {...props} />
    },
}

export default ProjectsComponentRegistry;