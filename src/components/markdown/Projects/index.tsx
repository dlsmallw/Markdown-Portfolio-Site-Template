import { Children, useEffect, useLayoutEffect, useState, type HTMLAttributes } from 'react';
import styles from './component.module.css';
import { useIsMobile, useWindowSizeThreshold } from '@utils/EventListeners';
import { inlineTryCatch } from '@utils/ErrorHandling';
import React from 'react';
import Tilt from 'react-parallax-tilt';

const DefaultProjectBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.homeProjectBlock} ${props.className}`} />
}

export interface ProjectTagContainerProps extends HTMLAttributes<HTMLDivElement> {
    separator?: string;
}

const ProjectTagContainer: React.FC<ProjectTagContainerProps> = ({ separator = ' ', ...props }) => {
    const childArr = React.Children.toArray(props.children).filter(
        (item) => !(typeof item === 'string' && /^\s*$/.test(item))
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
    const isMobile = useIsMobile();
    
    return (
        <Tilt
            glareEnable={!isMobile ? true : false} 
            glareMaxOpacity={!isMobile ? 0.15 : 0} 
            scale={!isMobile ? 1.03 : 1}
            // perspective={250}
            tiltMaxAngleX={!isMobile ? -3 : 0}
            tiltMaxAngleY={!isMobile ? -6 : 0}
        >
            <div 
                {...props} 
                className={`${styles.projectTitleCard} ${props.className ?? ''}`} 
                onClick={() => {
                    if (link) {
                        window.open(link, '_blank');
                    }
                }}
            ></div>
        </Tilt>
    );
}

const ProjectTextCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.projectTextCard} ${props.className ?? ''}`} />
}

const ProjectGrid: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.projectGrid} ${props.className ?? ''}`} />
}

const PortfolioBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    const [reversedChildren, setReversedChildren] = useState(props.children);

    const isReversed = inlineTryCatch(() => parseFloat(props.id.split('-').at(-1)) % 2 === 0, false);
    const isBelow = useWindowSizeThreshold(976);

    useLayoutEffect(() => {
        try {
            if (isReversed) {
                setReversedChildren(Children.toArray(props.children).reverse());
            }
        } catch (e) {

        }
        
    }, [])

    return (
        <div 
            {...props} 
            className={`${styles.portfolioProjectBlock} ${props.className ?? ''}`} 
            data-below-width={isBelow}
        >
            {isReversed && !isBelow ? (reversedChildren) : (props.children)}
        </div>
    )
}

const ComponentRegistry = {
    ['project-grid']: ProjectGrid,
    ['project-title']: ProjectTitle,
    ['project-description']: ProjectDescription,
    ['project-tags']: ProjectTagContainer,
    ['tag']: ProjectTag,
    ['project-title-card']: ProjectTitleCard,
    ['project-text-card']: ProjectTextCard,
    ['featured-block']: DefaultProjectBlock,
    ['portfolio-block']: PortfolioBlock
};

export default ComponentRegistry;