import { HTMLAttributes, useState } from "react";

const ProjectBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    // const [isHovered, setIsHovered] = useState(false);

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

interface ProjectLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    src?: string;
}

const ProjectLinkBtn: React.FC<ProjectLinkProps> = ({ src, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='project-link-btn-container'>
            <a 
                href={src} 
                target='_blank' 
                rel='noopener noreferrer' 
                className='project-link-btn'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    backgroundColor: isHovered ? '#0056b3' : '#007bff',
                    cursor: isHovered ? 'pointer' : 'default'
                }}
            >
                {children}
            </a>
        </div>
    )
}

const ProjectsComponentRegistry = {
    projectblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <ProjectBlock {...props}/>
    },
    projectlink: (props: ProjectLinkProps) => {
        return <ProjectLinkBtn src={props.src ?? ""} {...props}/>
    }
}

export default ProjectsComponentRegistry;