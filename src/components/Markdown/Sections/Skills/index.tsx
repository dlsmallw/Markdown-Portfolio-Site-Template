import { useState, type HTMLAttributes } from 'react';

import styles from './component.module.css';
import { TooltipText, TooltipWrapper } from '@components/Markdown/TooltipWrapper';

const SkillCategory: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.skillCategory} ${props.className ?? ''}`} />
}

const SkillGrid: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.skillGrid} ${props.className ?? ''}`} />
}

interface SkillCardProps extends HTMLAttributes<HTMLDivElement> {
    tooltiptext: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ tooltiptext, ...props }) => {
    const [shown, setShown] = useState(false);
    
    return (
        <TooltipWrapper shown={shown} setShown={setShown}>
            <div 
                {...props} 
                className={`${styles.skillCard} ${props.className ?? ''}`}
                data-hovered={shown}
            />

            <TooltipText key='tooltip-text'>
                {tooltiptext}
            </TooltipText>
        </TooltipWrapper>
        
    );
}

const ComponentRegistry = {
    ['skill-category']: SkillCategory,
    ['skill-grid']: SkillGrid,
    ['skill-card']: SkillCard
};

export default ComponentRegistry;