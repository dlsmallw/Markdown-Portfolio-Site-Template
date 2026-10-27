import { Children, useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import styles from './component.module.css';
import { useWindowSizeThreshold } from '@utils/EventListeners';
import { inlineTryCatch } from '@utils/ErrorHandling';

const DefaultProjectBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.homeProjectBlock} ${props.className}`} />
}

const ProjectTitleCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.projectTitleCard} ${props.className}`} />
}

const ProjectTextCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.projectTextCard} ${props.className}`} />
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
            className={`${styles.portfolioProjectBlock} ${props.className}`} 
            data-below-width={isBelow}
        >
            {isReversed && !isBelow ? (reversedChildren) : (props.children)}
        </div>
    )
}

const ComponentRegistry = {
    ['project-title-card']: ProjectTitleCard,
    ['project-text-card']: ProjectTextCard,
    ['featured-block']: DefaultProjectBlock,
    ['portfolio-block']: PortfolioBlock
};

export default ComponentRegistry;