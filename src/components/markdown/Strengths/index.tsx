import { HTMLAttributes } from "react";

import styles from './component.module.css';

const StrengthBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div className={styles.strengthBlock} {...props} />
    )
}

const ComponentRegistry = {
    strengthblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <StrengthBlock {...props} />
    }
}

export default ComponentRegistry;