import React from "react";
import { type HTMLAttributes } from "react";

import styles from './component.module.css';

interface SkillsCategoryBlock extends HTMLAttributes<HTMLDivElement> {
    title: string;
}

const SkillsCategoryContainer: React.FC<SkillsCategoryBlock> = ({ title, children }) => {
    return (
        <div className={`${styles.skillsCategory} skills-category`} >
            <h3>{title}</h3>
            <div className={`${styles.skillsGrid} skills-grid sunken-block`} >
                {children}
            </div>
        </div>
    )
}

const ComponentRegistry = {
    skillscategorycontainer: (props: SkillsCategoryBlock) => { 
        return <SkillsCategoryContainer {...props} />
    },
    

};

export default ComponentRegistry;