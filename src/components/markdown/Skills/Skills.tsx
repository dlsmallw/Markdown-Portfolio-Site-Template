import React from "react";
import { HTMLAttributes } from "react";

import styles from './Skills.module.css';

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

const SkillsComponentRegistry = {
    skillscategorycontainer: (props: SkillsCategoryBlock) => { 
        return <SkillsCategoryContainer {...props} />
    },
    

};

export default SkillsComponentRegistry;