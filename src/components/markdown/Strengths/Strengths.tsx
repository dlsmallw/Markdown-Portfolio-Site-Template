import { HTMLAttributes } from "react";

import styles from './Strengths.module.css';

const StrengthBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div className={styles.strengthBlock} {...props} />
    )
}

const StrengthComponentRegistry = {
    strengthblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <StrengthBlock {...props} />
    }
}

export default StrengthComponentRegistry;