import { HTMLAttributes, useEffect } from "react";

import styles from './Projects.module.css';

const ProjectBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    useEffect(() => {
        // Removes the tooltip element (remove if the tooltip effect is desired)
        const elements = document.querySelectorAll("#projects-section .cursor-tooltip");
        elements.forEach((elem) => {
            elem.remove();
        });
    }, []);

    return (
        <div className={`${styles.projectsBlock} projects-block ${props.className}`} {...props} />
    )
}

const ProjectsComponentRegistry = {
    projectblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <ProjectBlock {...props} />
    },
}

export default ProjectsComponentRegistry;