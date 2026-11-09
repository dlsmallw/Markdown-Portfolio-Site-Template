import type { HTMLAttributes } from 'react';

import styles from './component.module.css';

const IntroBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.introBlock} ${props.className ?? ''}`} />
}

const GreetingContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.greetingContainer} ${props.className ?? ''}`} />
}

const GreetingText: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
    return <span {...props} className={`${styles.greetingText} ${props.className ?? ''}`} />
}

const IntroductionText: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
    return <span {...props} className={`${styles.introductionText} ${props.className ?? ''}`} />
}

const PersonalDescriptionText: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
    return <span {...props} className={`${styles.personalDescriptionText} ${props.className ?? ''}`} />
}

const HeadshotBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div className={styles.headshotBlockContainer}>
            <div {...props} className={`${styles.headshotBlock} ${props.className ?? ''}`} />
        </div>
    );
};

const HeadshotImage: React.FC<HTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <img {...props} className={`${styles.headshotImage} ${props.className ?? ''}`} />
};

const LinksContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.linksContainer} ${props.className ?? ''}`} />
}

const ComponentRegistry = {
    ['intro-block']: IntroBlock,
    ['greeting-container']: GreetingContainer,
    ['greeting']: GreetingText,
    ['introduction']: IntroductionText,
    ['personal-description']: PersonalDescriptionText,
    ['headshot-block']: HeadshotBlock,
    ['headshot-image']: HeadshotImage,
    ['links-container']: LinksContainer,
};

export default ComponentRegistry;