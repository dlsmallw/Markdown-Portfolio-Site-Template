import { type HTMLAttributes, useEffect } from "react";

import styles from './component.module.css';

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

const ComponentRegistry = {
    projectblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <ProjectBlock {...props} />
    },
}

export default ComponentRegistry;