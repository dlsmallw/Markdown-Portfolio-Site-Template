import type { HTMLAttributes } from 'react';
import styles from './component.module.css';

const ProjectBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.projectBlock} ${props.className}`} />
}

const ComponentRegistry = {
    ['project-block']: ProjectBlock,
};

export default ComponentRegistry;