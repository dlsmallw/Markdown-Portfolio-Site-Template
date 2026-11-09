import type { HTMLAttributes } from 'react';

import styles from './component.module.css';

const SkillCategory: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.skillCategory} ${props.className ?? ''}`} />
}

const ComponentRegistry = {
    ['skill-category']: SkillCategory,
};

export default ComponentRegistry;