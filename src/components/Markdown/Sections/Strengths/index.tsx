import type { HTMLAttributes } from 'react';

import styles from './component.module.css';

const StrengthBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.strengthBlock} ${props.className ?? ''}`} />
}

const ComponentRegistry = {
    ['strength-block']: StrengthBlock,
};

export default ComponentRegistry;