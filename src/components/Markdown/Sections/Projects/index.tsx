import React, { type HTMLAttributes } from 'react';
import Tilt from 'react-parallax-tilt';

import { useIsMouseInput } from '@utils/event-listeners';
import { TooltipWrapper, TooltipText } from '../../TooltipWrapper';

import styles from './component.module.css';

export interface ProjectTagContainerProps extends HTMLAttributes<HTMLDivElement> {
    separator?: string;
}

const ProjectTagContainer: React.FC<ProjectTagContainerProps> = ({ separator = ' ', ...props }) => {
    const childArr = React.Children.toArray(props.children).filter(
        (item) => !(typeof item === 'string' && /^\s*$/.test(item)) // filters out empty text
    );

    return (
        <div {...props} className={`${styles.projectTagContainer} ${props.className ?? ''}`} >
            {childArr.reduce<React.ReactNode[]>((acc, child, index) => {
                if (React.isValidElement(child)) {
                    acc.push(child);

                    if (index < childArr.length - 1) {
                        acc.push(<span className={styles.separator} key={`sep-${index}`}>{separator}</span>);
                    }
                }

                return acc;
            }, [])}
        </div>
    )
}

const ProjectTag: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
    return <span {...props} className={`${styles.projectTag} ${props.className ?? ''}`} />
}

const ProjectTitle: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
    return <span {...props} className={`${styles.projectTitle} ${props.className ?? ''}`} />
}

const ProjectDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ ...props }) => {
    return <p {...props} className={`${styles.projectDescription} ${props.className ?? ''}`} />;
}

interface ProjectTitleCardProps extends HTMLAttributes<HTMLDivElement> {
    link?: string;
}

const ProjectTitleCard: React.FC<ProjectTitleCardProps> = ({ link, ...props }) => {
    const isMouse = useIsMouseInput();
    
    return (
        <TooltipWrapper style={{ flexDirection: 'unset' }}>
            <Tilt
                glareEnable={isMouse ? true : false} 
                glareMaxOpacity={isMouse ? 0.15 : 0} 
                scale={isMouse ? 1.03 : 1}
                tiltMaxAngleX={isMouse ? -3 : 0}
                tiltMaxAngleY={isMouse ? -6 : 0}
                style={{ height: '100%' }}
            >
                <div 
                    {...props} 
                    className={`${styles.projectTitleCard} ${props.className ?? ''}`} 
                    onClick={() => {
                        if (link) window.open(link, '_blank');
                    }}
                >
                    {props.children}
                    <span className={styles.subText}>
                        View Project
                    </span>
                </div>
            </Tilt>
            {isMouse && (
                <TooltipText key='tooltip-text' className={styles.projectTitleCardTooltip}>
                    View Project
                </TooltipText>
            )}
            
        </TooltipWrapper>
    );
}

const ProjectGrid: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.projectGrid} ${props.className ?? ''}`} />
}

const ComponentRegistry = {
    ['project-grid']: ProjectGrid,
    ['project-title']: ProjectTitle,
    ['project-description']: ProjectDescription,
    ['project-tags']: ProjectTagContainer,
    ['tag']: ProjectTag,
    ['project-title-card']: ProjectTitleCard,
};

export default ComponentRegistry;