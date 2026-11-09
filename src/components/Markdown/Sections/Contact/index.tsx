import type { HTMLAttributes } from 'react';

import styles from './component.module.css';

const ButtonsContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.buttonsContainer} ${props.className ?? ''}`} />;
}

const ComponentRegistry = {
    ['buttons-container']: ButtonsContainer,
};

export default ComponentRegistry;